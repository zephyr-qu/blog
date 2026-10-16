---
title: 学点| Python 入门（番外）
date: 2026-9-8
categories: 
  - 随笔感想
order: 8
---

# 学点| Python 入门（番外）

:::tip 前言

来点简单的

:::

## 一、模块

### 1.1 三种导入方式

一个 `.py` 文件就是一个模块，用 `import` 引入：

```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159
```

```python
# 三种导入方式
import mymodule                 # 用 mymodule.greet() 访问
from mymodule import greet, PI  # 直接使用 greet()
from mymodule import *          # 导入全部（不推荐，污染命名空间）
```

第三种 `import *` 会让代码里出现一堆"来源不明的名字"，排查问题时想找定义都费劲，团队项目里直接当禁用。

需要的话还能起别名，最常见的比如：

```python
from mypkg.utils import helper as h
import numpy as np
```

### 1.2 循环导入

一个要主动避开的坑：**A 导入 B、B 又导入 A**，会直接报错。遇到时通常说明两个模块职责划分不清，把公共部分抽到第三个模块里就好。

## 二、包

包含 `__init__.py` 的目录就是一个包（Python 3.3+ 可以省略这个文件，但建议保留）：

```
mypkg/
├── __init__.py
├── utils.py
└── sub/
    └── tools.py
```

```python
import mypkg.utils
from mypkg.sub import tools
from mypkg.utils import helper as h   # 用 as 起别名
```

对照 Java 的话，`mypkg.sub.tools` 和 `com.example.tools` 是一个意思，只是 Python 不强制域名倒写，目录长什么样导入路径就长什么样。

## 三、main 入口

Python 没有像 Java 那样规定的 `main` 方法，惯用写法是：

```python
def main():
    print("程序入口")

if __name__ == "__main__":
    main()   # 只有直接运行时才执行
```

原理是每个模块都有个内置变量 `__name__`：

- **直接运行** `python mymodule.py` → `__name__` 是 `"__main__"`，条件成立，`main()` 执行
- **被别人 import** → `__name__` 是 `"mymodule"`，条件不成立，什么也不发生

> 好处：同一个文件，既能让别人 import 复用里面的函数，又能自己直接跑起来做测试，两不耽误。

## 四、pip 与虚拟环境

### 4.1 pip：装第三方库

```bash
pip install requests          # 安装
pip install requests==2.31.0  # 指定版本
pip install -r requirements.txt  # 批量安装
pip list                      # 查看已装
pip uninstall requests        # 卸载
```

`requirements.txt` 就是 Python 版的 pom.xml 依赖清单，项目根目录放一份，别人拿到代码 `pip install -r requirements.txt` 一条命令还原环境。

### 4.2 venv：给每个项目独立的依赖空间

如果所有项目的库都装在一起，A 项目要 requests 2.28、B 项目要 2.31，就死锁了。**虚拟环境**给每个项目隔离出一份独立的依赖：

```bash
python -m venv .venv          # 创建虚拟环境（Windows 在 .venv\Scripts\）
# 激活
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS/Linux
# 退出
deactivate
```

激活后 `pip install` 装的东西只进当前项目的 `.venv`，互不干扰。习惯是环境名就叫 `.venv` 并加进 `.gitignore`——它只需要重建，不需要进版本库。

:::tip 提示

写惯 Java 的同学可以这样对应：venv ≈ 项目本地的依赖仓库，激活 ≈ 切换到这个项目的 classpath。区别是 Python 需要你"手动进入"环境，而不是构建工具自动处理。

:::

## 五、文件读写

### 5.1 with open：读文件的标准姿势

```python
# 读
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()          # 全部读为字符串
    lines = f.readlines()       # 读为行列表
    for line in f:              # 逐行读（推荐，省内存）
        print(line)

# 写
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("hello\n")

# 追加
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("new line\n")
```

`with` 会自动关闭文件，不用手动 `f.close()`——它就是"上下文管理器"的第一次登场，入门（三）会详细讲它为什么能自动清理。

模式速查：

| 模式  | 含义                |
| --- | ----------------- |
| `r` | 只读（默认）            |
| `w` | 写入，覆盖已有内容         |
| `a` | 追加                |
| `x` | 创建新文件，存在则报错       |
| `b` | 二进制模式，如 `rb`/`wb` |

:::warning 注意

两件事形成肌肉记忆：

1. **读写中文必须指定** **`encoding="utf-8"`**，Windows 上默认编码是 GBK，不指定就等着乱码或者直接报错
2. `w` 模式一打开就把旧内容清空了，想保留原有内容用 `a` 追加

:::

## 六、异常处理

### 6.1 try/except/else/finally

Python 没有 checked exception，所有异常都靠 try 捕获：

```python
try:
    num = int(input("输入数字："))
    result = 10 / num
except ValueError:
    print("输入的不是数字")
except ZeroDivisionError as e:
    print("不能除以 0：", e)
else:
    print("无异常时执行：", result)
finally:
    print("无论是否异常都执行（如关闭资源）")
```

执行顺序记两条就够：

- `try` 正常 → 执行 `else` → `finally`
- `try` 异常 → 匹配 `except` → `finally`

`finally` 始终执行，常用于释放资源（虽然有了 with 之后，大部分场景轮不到它出场）。

### 6.2 常见异常类型

| 异常                  | 触发场景              |
| ------------------- | ----------------- |
| `ValueError`        | 值不合法，如 int("abc") |
| `TypeError`         | 类型不匹配，如 1 + "a"   |
| `FileNotFoundError` | 文件不存在             |
| `ZeroDivisionError` | 除数为 0             |
| `IndexError`        | 下标越界              |
| `KeyError`          | 字典键不存在            |
| `AttributeError`    | 访问不存在的属性/方法       |

### 6.3 自定义异常

业务上的错误自己定义异常类型，用 `raise` 主动抛出：

```python
class BalanceError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise BalanceError(f"余额不足，当前 {balance}")
    return balance - amount
```

自定义异常继承 `Exception` 就行。比起返回 -1、None 这类"魔法值"表示失败，抛异常能把"正常流程"和"错误处理"干净地分开，这点和 Java 是一致的。

:::warning 注意

两个坏习惯：

1. `except` 空着不写处理逻辑，至少 `pass` 或打个日志
2. `except Exception: pass` 静默吞掉所有异常——bug 会被藏起来，排查时能让人查一整天🤔

:::
