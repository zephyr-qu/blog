---
title: 胡说| Wget 简明使用
date: 2026-7-26
categories:
  - 编程知识
tags:
  - 命令行
order: 9
---

# Wget 简明使用

:::tip

在终端里很常用的一款下载工具

:::



## Wget简介

### 什么是Wget？
Wget是一个开源的命令行下载工具，用于从网络上下载文件。其特点包括：
- **多协议支持**：支持HTTP、HTTPS、FTP等协议。  
- **断点续传**：下载中断后可从中断处继续，无需重来。  
- **递归下载**：可递归下载整个目录甚至镜像整个网站。  
- **跨平台**：可在Windows、Linux、macOS等系统运行。  
### 为什么选择Wget？
- **轻量高效**：无需图形界面，默认行为就是下载到文件，适合自动化脚本。  
- **下载利器**：断点续传、递归下载、镜像站点等 curl 不具备的独有功能。  
- **批量处理**：支持从文件读取URL列表批量下载。  

## Wget命令参数详解

### 基础参数

> 记住大概的命令就好，进阶的方法也不是很常用。

| 参数                 | 作用                       | 示例                                                         |
| -------------------- | -------------------------- | ------------------------------------------------------------ |
| `-O` 或 `--output-document` | 指定保存文件名                 | `wget -O myfile.zip https://example.com/file.zip`                    |
| `-c` 或 `--continue`      | 断点续传                     | `wget -c https://example.com/large-file.zip`                        |
| `-P` 或 `--directory-prefix` | 指定保存目录              | `wget -P ./downloads https://example.com/file.zip`                  |
| `-q` 或 `--quiet`         | 静默模式                     | `wget -q -O data.zip https://example.com/data.zip`                  |
| `-o` 或 `--output-file`   | 输出日志到文件               | `wget -o download.log https://example.com/file.zip`                 |
| `--limit-rate`            | 限速下载                     | `wget -c --limit-rate=1M https://example.com/large-file.zip`        |
| `--user` / `--password`   | HTTP认证                     | `wget --user=admin --password=secret https://example.com/protected` |

### 进阶参数

| 参数                           | 作用                     | 示例                                                                 |
| ------------------------------ | ------------------------ | -------------------------------------------------------------------- |
| `--header`                     | 添加请求头               | `wget --header "Accept: application/json" https://example.com`       |
| `--post-data` / `--post-file`  | 发送POST数据             | `wget --post-data "name=John" https://example.com/api`              |
| `--load-cookies` / `--save-cookies` | 加载/保存Cookie      | `wget --load-cookies cookies.txt https://example.com`                |
| `-e` 或 `--execute`            | 设置代理                 | `wget -e use_proxy=yes -e http_proxy=proxy:8080 https://example.com` |
| `--no-check-certificate`       | 忽略SSL证书验证          | `wget --no-check-certificate https://self-signed.example.com`        |
| `--retry-connrefused`          | 连接拒绝时重试           | `wget --retry-connrefused https://example.com`                       |
| `--tries=N`                    | 设置重试次数             | `wget --tries=5 https://example.com`                                 |
| `--wait`                       | 请求间隔（礼貌爬取）     | `wget -r --wait=2 https://example.com`                               |



## 实战示例

**1. 下载单个文件**

```bash
# 默认行为，保存为 index.html
wget https://example.com
```

**与 curl 区别**：wget 默认下载到文件，curl 默认输出到终端。curl -o = wget -O

**2. 断点续传**

```bash
# 大文件推荐：断点续传 + 限速
wget -c --limit-rate=1M https://example.com/large-file.zip
```



**3. 递归下载整个目录**

```bash
# 限制深度：只下载 2 层
wget -r -l 2 https://example.com/docs/
```



**4. 按文件类型过滤**

```bash
# 只下载 PDF 文件
wget -r -A.pdf https://example.com/papers/

# 排除图片
wget -r -R.jpg,.png,.gif https://example.com/gallery/
```



**5. 镜像整个站点**

```bash
# -m = -r -N -l inf（递归 + 时间戳 + 无限深度）
wget -m -np -nH https://docs.example.com
```

**注意**：镜像别人站点前确认 robots.txt 允许，尊重版权



**6. 从文件批量下载**

```bash
# urls.txt 内容：
# https://example.com/file1.zip
# https://example.com/file2.zip
wget -i urls.txt

# 批量下载 + 断点续传
wget -c -i urls.txt -P ./downloads
```



**7. 带认证下载**

```bash
# HTTP Basic Auth
wget --user=admin --password=secret https://example.com/protected.zip
```


## curl vs wget

|            | curl                | wget           |
| :--------- | :------------------ | -------------- |
| 调接口     | ✅ 强（-H -d -v -w） | ❌              |
| 下单个文件 | ✅ curl -o           | ✅ wget         |
| 断点续传   | ❌（不支持）         | ✅ wget -c      |
| 递归下载   | ❌                   | ✅ wget -r      |
| 镜像站点   | ❌                   | ✅ wget -m      |
| 限速       | ✅ --limit-rate      | ✅ --limit-rate |
| 批量 URL   | ❌                   | ✅ wget -i      |
| 协议支持   | HTTP/FTP/SMTP/...   | HTTP/FTP       |