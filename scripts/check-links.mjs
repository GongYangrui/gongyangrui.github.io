import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, relative } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;

if (!existsSync(root)) {
  console.error("dist/ does not exist. Run the production build first.");
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function outputPath(rawPath) {
  const pathname = decodeURI(rawPath.split(/[?#]/, 1)[0]);
  const clean = pathname.replace(/^\//, "");
  if (!clean) return join(root, "index.html");
  if (extname(clean)) return join(root, clean);
  return join(root, clean, "index.html");
}

const failures = [];
const htmlFiles = walk(root).filter((path) => path.endsWith(".html"));
const attributePattern = /(?:href|src)=["']([^"']+)["']/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(attributePattern)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(target)) continue;

    const absolute = target.startsWith("/")
      ? outputPath(target)
      : normalize(join(file.endsWith("index.html") ? join(file, "..") : join(file, ".."), target.split(/[?#]/, 1)[0]));

    const resolved = extname(absolute) ? absolute : join(absolute, "index.html");
    if (!existsSync(resolved)) {
      failures.push(`${relative(root, file)} -> ${target}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal link(s):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files: all internal links resolve.`);
