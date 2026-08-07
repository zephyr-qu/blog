---
title: 胡说| Curl 简明使用
date: 2026-7-26
categories:
  - 编程知识
tags:
  - 命令行
order: 8
---

# Curl 简明使用

:::tip

在终端里很常用的一款调试工具

:::



## Curl 简介

### 什么是 Curl？
Curl 是一个开源的命令行工具和库（libcurl），用于在服务器与客户端之间传输数据。其特点包括：
- **多协议支持**：覆盖HTTP、HTTPS、FTP、SMTP、SFTP等。  
- **跨平台**：可在Windows、Linux、macOS等系统运行。  
- **灵活性强**：支持文件上传、Cookie管理、代理设置等高级功能。

### 为什么选择 Curl？
- **轻量高效**：无需图形界面，适合服务器环境和自动化脚本。  
- **调试利器**：可详细输出请求与响应信息，快速定位问题。  
- **广泛应用**：从REST API测试到网络爬虫开发，用途广泛。



## Curl 命令参数详解

### 基础参数

> 记住大概的命令就好，进阶的方法也不是很常用。

| 参数                 | 作用           | 示例                                                         |
| -------------------- | -------------- | ------------------------------------------------------------ |
| `-X` 或 `--request`  | 指定HTTP方法   | `curl -X POST https://api.example.com`                       |
| `-H` 或 `--header`   | 添加请求头     | `curl -H "Content-Type: application/json" https://api.example.com` |
| `-d` 或 `--data`     | 发送POST数据   | `curl -d "name=John&age=30" https://api.example.com`         |
| `-o` 或 `--output`   | 保存响应到文件 | `curl -o result.txt https://example.com`                     |
| `-v` 或 `--verbose`  | 显示详细日志   | `curl -v https://example.com`                                |
| `-L` 或 `--location` | 自动跟随重定向 | `curl -L https://example.com/old-link`                       |



### 进阶参数

| 参数                   | 作用             | 示例                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------ |
| `-F` 或 `--form`       | 上传文件（表单） | `curl -F "file=@photo.jpg" https://upload.example.com` |
| `-b` 或 `--cookie`     | 发送Cookie       | `curl -b "session=abc123" https://example.com`         |
| `-c` 或 `--cookie-jar` | 保存Cookie到文件 | `curl -c cookies.txt https://example.com`              |
| `-x` 或 `--proxy`      | 使用代理         | `curl -x http://proxy:8080 https://example.com`        |
| `-k` 或 `--insecure`   | 忽略SSL证书验证  | `curl -k https://self-signed.example.com`              |



## 实战示例

**1. 测试REST API**

```bash
# 发送GET请求
curl -X GET https://api.example.com/users

# 发送JSON格式的POST请求
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 30}' \
  https://api.example.com/users
```



**2. 下载文件**

```bash
# 下载文件并保存为本地文件
curl -o linux.iso https://example.com/linux.iso

# 断点续传（需服务器支持）
curl -C - -O https://example.com/large-file.zip
```



**3. 调试网络问题**

```bash
# 查看详细请求过程（包括握手过程）
curl -v https://example.com

# 分析请求耗时
curl -w "DNS解析耗时: %{time_namelookup}\n总耗时: %{time_total}\n" https://example.com
```



**4. 身份验证**

```bash
# Basic认证
curl -u username:password https://api.example.com

# Bearer Token认证
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com
```



**注意事项**

- **避免明文密码**：不要在命令行中直接写入密码，改用环境变量或配置文件。  
- **证书验证**：生产环境中避免使用 `-k` 参数，确保SSL/TLS安全。  
- **限速下载**：防止占用过多带宽，使用 `--limit-rate` 控制速度：  
