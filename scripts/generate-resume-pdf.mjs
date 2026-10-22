import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { chromium } from "playwright";

const dist = new URL("../dist/", import.meta.url).pathname;
const output = join(dist, "resume.pdf");
const localChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
};

if (!existsSync(join(dist, "resume", "index.html"))) {
  console.error("The built resume page is missing. Run `npm run build` first.");
  process.exit(1);
}

const server = createServer((request, response) => {
  const requestPath = decodeURI(new URL(request.url ?? "/", "http://127.0.0.1").pathname);
  let file = join(dist, requestPath.replace(/^\//, ""));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" });
  response.end(readFileSync(file));
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();

try {
  const browser = await chromium.launch({
    headless: true,
    ...(existsSync(localChrome) ? { executablePath: localChrome } : {}),
  });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${address.port}/resume/`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({ path: output, format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log(`Generated ${output}`);
} finally {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
