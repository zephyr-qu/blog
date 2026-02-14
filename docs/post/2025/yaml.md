---
title: 关于| YAML 语言
date: 2025-12-12
categories:
  - 编程知识
order: 12
---

# YAML 语言

::: tip 前言

springboot 的配置文件有 一种 yaml 的配置方式很常用，咱也得了解了解😁

:::

## 简介

YAML（**YAML Ain't a Markup Language**）是一种专注数据序列化的轻量级语言。最初，其含义为 “Yet Another Markup Language”，为突出其以数据为中心的特性，后改为反向缩略语。它常用于配置文件、云原生应用及容器编排等领域，后缀为 `yml` 或 `yaml`。



## 基础语法

1. **大小写敏感**：`key` 和 `Key` 表示不同的键。  
2. **缩进规则**：  
   - 使用空格（**禁止 Tab**）。  
   - 同级元素左对齐，缩进空格数不限。  
3. **注释**：以 `#` 开头。  
4. **键值分隔**：冒号 `:` 后必须加空格。



::: warning 注意

很多人会踩坑  **同级元素左对齐**  和  **冒号** `:` **后必须加空格** 这两点，一定要注意下。

:::

## 数据类型详解

### 1. 对象（映射）

表示键值对集合，支持多种写法：  
```yaml
# 普通键值对
name: ximing

# 单行写法
person: {name: ximing, age: 18}

# 多行缩进
person:
  name: ximing
  age: 18
```



### 2. 数组（序列）

以 `-` 开头的行表示数组元素：  
```yaml
# 简单数组
fruits:
  - Apple
  - Banana

# 多维数组（行内写法）
matrix: [[1, 2], [3, 4]]

# 对象数组
users:
  - name: Bob
    role: admin
  - name: Eve
    role: guest
```



### 3. 纯量（标量）

不可再分的基本值类型：  
- **字符串**：默认不加引号，含特殊字符时可用单/双引号包裹。  
- **布尔值**：`true`/`false`（不区分大小写）。  
- **数值**：整数、浮点数（支持科学计数法 `6.852e+5`）。  
- **空值**：用 `null` 或 `~` 表示。  
- **日期与时间**：遵循 ISO 8601 格式，如 `2023-10-05T14:30:00+08:00`。

```yaml
example:
  string: Hello World
  boolean: true
  float: 3.14
  timestamp: 2023-10-05T14:30:00+08:00
  empty: ~
```



### 4. 多行文本处理

- `|` 保留换行符：  
  ```yaml
  message: |
    Line 1
    Line 2
  ```
  输出：`"Line 1\nLine 2\n"`  

- `>` 折叠换行符为空格：  
  ```yaml
  message: >
    Line 1
    Line 2
  ```
  输出：`"Line 1 Line 2\n"`  



## 高级特性

> 看看就好，我都没见过😅

### 1. 类型强制转换

使用 `!!` 强制指定类型：  
```yaml
port: !!str 8080  # 将整数转为字符串
enabled: !!str true  # 将布尔值转为字符串
```



### 2. 复杂键映射

```yaml
# 复杂键（使用 ? 标记）
? [key1, key2]
: [value1, value2]
# 或者
?
  - key1
  - key2
:
  - value1
  - value2
```



### 3. 锚点与别名

通过 `&` 定义锚点，`*` 引用别名，`<<` 合并数据：  
```yaml
defaults: &base-config
  timeout: 30
  retry: 3

production:
  <<: *base-config  # 合并锚点内容
  endpoint: api.example.com

# 等效于：
production:
  timeout: 30
  retry: 3
  endpoint: api.example.com
```


## YAML vs. JSON

| 特性         | YAML                       | JSON                 |
| ------------ | -------------------------- | -------------------- |
| **可读性**   | 高（依赖缩进与符号）       | 较低（依赖括号逗号） |
| **注释**     | 支持                       | 不支持               |
| **数据类型** | 更丰富（日期、多行文本等） | 基础类型             |
| **适用场景** | 配置文件、复杂结构         | API 数据交换         |

## 写在最后

YAML 在云原生十分重要，尤其在 K8s 中被广泛采用，被调侃为 YAML 程序员。

> 不会YAML？那很难搞喽🤣



## 参考三三

- https://yaml.org/
- https://www.json2yaml.com/
- https://www.ruanyifeng.com/blog/2016/07/yaml.html
