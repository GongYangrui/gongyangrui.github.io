---
lang: zh
slug: rclone-google-drive
title: 使用 Rclone 连接 Google Drive
description: 在没有 sudo 权限的服务器上安装 Rclone、完成 Google Drive 授权并上传文件的实践记录。
publishedAt: 2025-05-22
tags:
  - Rclone
  - Google Drive
  - Linux
draft: false
---

远程连接服务器时，直接通过 SSH 或 SFTP 下载大文件可能很慢。我当时可以比较稳定地访问 Google Drive，因此尝试用 Rclone 把服务器上的文件先上传到云盘，再从本地下载。

服务器账户没有 `sudo` 权限，下面记录无需管理员权限的安装和授权过程。

## 安装 Rclone

```bash
curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64

mkdir -p ~/.local/bin
cp rclone ~/.local/bin/

echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

完成后运行：

```bash
rclone config
```

## 创建 Google OAuth 凭据

配置过程中需要填写 Client ID 和 Client Secret。Rclone 的[官方说明](https://rclone.org/drive/#making-your-own-client-id)列出了创建凭据的步骤。

![在 Google Cloud 中寻找 Credentials](/media/blog/rclone-credentials.png)

![创建 OAuth 凭据](/media/blog/rclone-oauth.png)

![添加授权范围](/media/blog/rclone-scopes.png)

如果希望 Rclone 可以上传和下载所有文件，在访问权限步骤选择完整读写权限。

![选择 Google Drive 访问权限](/media/blog/rclone-access.png)

## 在本地完成授权

服务器没有浏览器时，Rclone 会给出一条 `rclone authorize ...` 命令。把它复制到本地电脑运行，在浏览器中完成 Google 授权，再把生成的 token 完整复制回服务器。

![在本地完成 Rclone 授权](/media/blog/rclone-authorize.png)

如果本地正在使用代理，需要确认终端使用的代理端口与代理软件一致。我曾遇到下面的错误：

```text
failed to get token: proxyconnect tcp: dial tcp 127.0.0.1:7890:
connectex: No connection could be made because the target machine actively refused it
```

修正代理端口后重新运行授权即可。

![Rclone 配置完成](/media/blog/rclone-complete.png)

## 上传文件

```bash
rclone copy file_path gyr:
rclone copy file_path gyr:Backup/
```

第一条命令上传到云盘根目录，第二条上传到 `Backup` 文件夹。实际使用时还可以增加进度显示、并发数和校验参数。
