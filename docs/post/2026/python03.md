---
title: 学点| Python 入门（三）
date: 2026-9-8
categories: 
  - 随笔感想
order: 9
---

# 学点| Python 入门（三）

:::tip 前言

最后我们来点 高级货

:::

## 一、推导式

### 1.1 列表推导式

先看它解决什么问题。"筛出 0\~19 里的偶数"，普通写法：

```python
evens2 = []
for x in range(20):
    if x % 2 == 0:
        evens2.append(x)
```

列表推导式一行搞定：

```python
# 基本形式：[表达式 for 变量 in 可迭代对象 if 条件]
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, ..., 18]

squares = [x * x for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 双重循环
pairs = [(x, y) for x in range(3) for y in range(3)]

# 实战应用：清洗字符串
names = ["  Alice ", "BOB", " carol "]
clean = [n.strip().title() for n in names]
# ['Alice', 'Bob', 'Carol']
```

读法就是把它当英语句子念："对 range(20) 里的每个 x，如果 x 是偶数，就把 x 放进列表"。比 Stream API 那一串 `.stream().filter().collect()` 省了太多仪式感。

### 1.2 字典与集合推导式

把外面的括号换掉，就是另外两种推导式：

```python
# 字典推导式：{键表达式: 值表达式 for ...}
squares_dict = {x: x * x for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 过滤 + 键值变换
scores = {"A": 90, "B": 60, "C": 40}
passed = {k: v for k, v in scores.items() if v >= 60}
# {'A': 90, 'B': 60}

# 集合推导式：自动去重
unique = {x % 3 for x in range(10)}
# {0, 1, 2}

words = ["apple", "banana", "apple"]
lens = {len(w) for w in words}
# {5, 6}
```

:::warning 注意

推导式虽好，但**嵌套不要超过两层**，再深就没人读得懂了，老老实实写 for 循环。可读性永远优先。

:::

### 1.3 生成器表达式

把列表推导式的 `[]` 换成 `()`，就从"一次性造出整个列表"变成了"按需逐个产生"：

```python
gen = (x * x for x in range(10))
print(gen)          # <generator object ...>，不是列表！
print(next(gen))    # 0，逐个产生
print(sum(gen))     # 剩余元素求和

# 大范围数据优先用生成器
total = sum(x for x in range(1_000_000))   # 全程不占内存
```

这就是**惰性求值**：数据不落地，要用一个算一个。想理解它，得先聊聊迭代器。

## 二、迭代器

### 2.1 for 循环的真面目

可迭代对象（list、str、dict、range...）都能被 for 遍历，背后是一套协议：

```python
lst = [1, 2, 3]
it = iter(lst)          # iter() 获取迭代器
print(next(it))         # 1
print(next(it))         # 2
print(next(it))         # 3
# next(it) 再调 → StopIteration 异常

# for 循环的本质：自动调用 iter() 和 next()，遇到 StopIteration 就停
for x in lst:
    print(x)
```

所以 for 循环不是什么特殊语法，它只是把 `iter()/next()/StopIteration` 这套流程包装得优雅了而已。

### 2.2 自定义迭代器

自己实现 `__iter__` 和 `__next__` 两个魔术方法，就能造出可被 for 遍历的对象：

```python
class CountDown:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return self

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

for x in CountDown(3):
    print(x)   # 3 2 1
```

能看到 `StopIteration` 就抛——这正是上一篇讲的"魔术方法由 Python 在特定时机触发"的又一例。

## 三、生成器与 yield

### 3.1 生成器函数

自定义迭代器要写两个魔术方法，有点啰嗦。**含** **`yield`** **的函数就是生成器函数**，Python 会自动帮你完成上面的所有 plumbing：

```python
def count_down(n):
    while n > 0:
        yield n      # 每次迭代暂停并返回 n
        n -= 1

gen = count_down(3)
print(next(gen))   # 3，执行到第一个 yield 后暂停
print(next(gen))   # 2，从上次暂停处继续
print(next(gen))   # 1
# 再调用 → StopIteration

for x in count_down(3):   # 配合 for 自动处理 StopIteration
    print(x)
```

神奇之处在于：普通函数一执行到底，生成器函数却能在 `yield` 处**暂停并记住现场**，下次 `next()` 从暂停点继续。函数执行到一半能"冻住再解冻"，这是普通语言函数做不到的。

### 3.2 惰性求值：内存优势

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a        # 无限序列，不占内存
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib))   # 0 1 1 2 3 5 8 13 21 34
```

注意 `while True` ——一个**无限序列**，却完全不占内存，因为数永远是"现算的"。对比一次性生成的写法：

```python
def fib_list(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result      # 全部放进内存
```

| 特性   | 普通函数     | 生成器函数       |
| ---- | -------- | ----------- |
| 关键字  | `return` | `yield`     |
| 调用结果 | 立即执行并返回值 | 返回生成器对象，不执行 |
| 状态   | 每次从头执行   | 记住上次位置，可继续  |
| 内存   | 一次性全部在内存 | 逐个产生，省内存    |
| 遍历   | 可重复使用结果  | 只能用一次，遍历后耗尽 |

### 3.3 yield from 与数据管道

`yield from` 把迭代委托给另一个可迭代对象，简化嵌套循环：

```python
def flatten(nested):
    for sub in nested:
        yield from sub    # 等价于：for x in sub: yield x

print(list(flatten([[1, 2], [3, 4]])))   # [1, 2, 3, 4]

# 链式管道：yield from 拼接多个生成器
def combine(gen1, gen2):
    yield from gen1
    yield from gen2
```

生成器最适合的舞台是**流式数据管道**——读大文件一行处理一行，从头到尾不占额外内存：

```python
def read_lines(file_path):
    with open(file_path, encoding="utf-8") as f:
        for line in f:
            yield line.strip()        # 逐行产出

def non_empty(lines):
    for line in lines:
        if line:
            yield line

# 惰性串联，任意环节都不占额外内存
clean = non_empty(read_lines("data.txt"))
```

:::warning 注意

生成器**只能遍历一次**，遍历完就耗尽，`sum(gen)` 之后 gen 就是空的了。需要重复使用就转成 list，或重新创建。另外它没有长度，`len(gen)` 会直接报错。

:::

## 四、装饰器

### 4.1 本质：函数也是对象

Python 里函数是"一等公民"——可以赋值给变量、当参数传、当返回值返回。装饰器全部建立在这个基础上：**装饰器就是一个接收函数并返回新函数的函数**。

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("调用前")
        result = func(*args, **kwargs)
        print("调用后")
        return result
    return wrapper

@my_decorator
def greet(name):
    return f"Hello, {name}!"

# @ 只是语法糖，等价于：greet = my_decorator(greet)
print(greet("Alice"))
# 调用前
# Hello, Alice!
# 调用后
```

`@my_decorator` 这行读作"用 my\_decorator 加工一下下面的函数"，效果类似 Java 的注解 + AOP，但你手写的只有普通函数，没有框架。

### 4.2 functools.wraps：保留原函数身份

装饰后返回的其实是 `wrapper`，原函数的 `__name__`、`__doc__` 会丢：

```python
from functools import wraps

def log(func):
    @wraps(func)          # 保留原函数元信息，就加这一行
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    """两数相加"""
    return a + b

print(add.__name__)   # add（不用 wraps 会变成 wrapper）
print(add.__doc__)    # 两数相加
```

写装饰器就养成习惯：`@wraps(func)` 顺手加上。

### 4.3 带参装饰器

装饰器自己也要参数时，再套一层，变成三层嵌套：

```python
from functools import wraps

def repeat(times):            # 第 1 层：收装饰器参数
    def decorator(func):      # 第 2 层：收函数
        @wraps(func)
        def wrapper(*args, **kwargs):   # 第 3 层：实际执行
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def hello():
    print("hi")

hello()   # hi hi hi
```

层级记法：**带参装饰器 = 装饰器外面再包一层**。`repeat(3)` 先执行，返回真正的装饰器，再去装饰 `hello`。

### 4.4 常见应用

计时和缓存是两个最经典的场景：

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} 耗时 {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_task():
    time.sleep(0.1)
```

```python
from functools import wraps

def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(10))   # 没有缓存的话，这个递归是指数级的
```

:::tip 提示

wrapper 里必须用 `*args, **kwargs` 把参数原样转发，并且记得 `return result`——忘了 return，原函数的返回值就变成 None 了，这是装饰器最高频的 bug。

:::

## 五、上下文管理器

### 5.1 with 语句的作用

其实上一篇已经偷偷用过它了——`with open(...)`。它的职责就一句话：**进入时初始化，离开时无论是否异常都自动清理**。

```python
# 不用 with
f = open("data.txt")
try:
    content = f.read()
finally:
    f.close()

# 用 with（等价且更简洁）
with open("data.txt") as f:
    content = f.read()
# 离开 with 自动 close，即使中途异常
```

Java 程序员可以理解为 try-with-resources，但 Python 里不要求实现 AutoCloseable 接口，实现两个魔术方法就行。

### 5.2 自定义上下文管理器

实现 `__enter__` 和 `__exit__`：

```python
class Timer:
    def __enter__(self):
        print("开始计时")
        import time
        self.start = time.perf_counter()
        return self            # 返回值绑定给 as 变量

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"耗时 {time.perf_counter() - self.start:.4f}s")
        # 返回 False/None → 异常继续抛出；返回 True → 吞掉异常
        return False

with Timer() as t:
    print("执行任务")
# 开始计时
# 执行任务
# 耗时 0.0000s
```

`__exit__` 的三个参数分别是异常类型、异常实例、traceback，无异常时都是 None。返回 `True` 表示"异常我处理了"，不会向外抛——默认返回 False 让异常照常传播，通常这才是对的行为。

### 5.3 @contextmanager：生成器又出场了

每次写个类太重，`@contextmanager` 让你用生成器写法搞定——`yield` 前面是 `__enter__`，后面是 `__exit__`：

```python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    print("开始")
    start = time.perf_counter()
    try:
        yield          # 这里执行 with 块内代码
    finally:
        print(f"结束，耗时 {time.perf_counter() - start:.4f}s")

with timer():
    print("任务进行中")
```

:::warning 注意

`yield` 必须包在 `try/finally` 里，否则 with 块内抛异常时，清理逻辑不会执行。

:::

### 5.4 常见应用场景

文件、锁、数据库连接，凡是"用了必须还"的资源都适合 with：

```python
# 数据库连接：自动提交/回滚并关闭
import sqlite3

class Database:
    def __enter__(self):
        self.conn = sqlite3.connect("test.db")
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.conn.close()
        return False

with Database() as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS t(id)")

# 线程锁：自动获取和释放
import threading
lock = threading.Lock()
with lock:
    pass   # 临界区代码
```

contextlib 里还有两个好用的现成工具：

```python
from contextlib import suppress, redirect_stdout

# suppress：静默忽略指定异常
with suppress(FileNotFoundError):
    open("不存在.txt")    # 不报错

# redirect_stdout：临时重定向输出
import io
buffer = io.StringIO()
with redirect_stdout(buffer):
    print("这段输出被捕获")
print(buffer.getvalue())
```

## 六、标准库巡礼

最后逛一圈最常用的内置模块。"自带电池"不是吹的，很多需求不用装任何第三方包。

### 6.1 pathlib：路径操作

现代推荐的路径操作方式，替代字符串拼路径的 os.path：

```python
from pathlib import Path

p = Path("data/report.txt")
print(p.name)          # report.txt
print(p.stem)          # report
print(p.suffix)        # .txt
print(p.parent)        # data
print(p.exists())      # 是否存在

# 用 / 拼接路径，跨平台无忧
f = Path("data") / "report.txt"
f.write_text("hello", encoding="utf-8")
text = f.read_text(encoding="utf-8")

# 遍历目录
for file in Path(".").glob("*.py"):
    print(file)
```

### 6.2 json：数据序列化

```python
import json

data = {"name": "Alice", "age": 25, "tags": ["py", "web"]}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
# ensure_ascii=False 保留中文，indent 美化输出

obj = json.loads(json_str)          # 字符串 ↔ 对象

# 与文件交互：dump/load 直接读写文件
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
with open("data.json", encoding="utf-8") as f:
    obj = json.load(f)
```

:::warning 注意

写中文不传 `ensure_ascii=False`，会全部变成 `\uXXXX` 转义，打开文件一堆乱码样的东西。这个参数建议形成肌肉记忆。

:::

### 6.3 re：正则表达式

```python
import re

text = "我的电话是 138-1234-5678，邮箱 test@example.com"

phones = re.findall(r"\d{3}-\d{4}-\d{4}", text)   # 查找所有匹配

m = re.search(r"(\d{3})-(\d{4})-(\d{4})", text)   # 提取分组
if m:
    print(m.group(0))   # 完整匹配
    print(m.group(1))   # 第一个分组 138

new = re.sub(r"\d{3}-\d{4}-\d{4}", "***", text)   # 替换

is_email = re.match(r"^[\w.]+@[\w.]+\.\w+$", "test@example.com") is not None
```

常用元字符：`\d` 数字、`\w` 单词字符、`\s` 空白、`.` 任意字符、`*`/`+`/`?`、`[]` 字符集、`()` 分组、`^`/`$` 锚点。

> 记住 `match` 从头匹配、`search` 全文搜索，这个区别面试爱问。

### 6.4 collections：高级容器

```python
from collections import Counter, defaultdict, namedtuple, deque

# Counter：计数神器
cnt = Counter("abracadabra")
print(cnt.most_common(2))   # [('a', 5), ('r', 2)]

# defaultdict：带默认值的字典，告别 KeyError
d = defaultdict(list)
d["a"].append(1)      # 键不存在自动建空 list，无需先初始化

# namedtuple：有名字的元组，轻量版"只读对象"
Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
print(p.x, p.y)       # 1 2

# deque：双端队列，两端增删都是 O(1)
q = deque([1, 2, 3])
q.appendleft(0)
q.pop()
```

Java 里用 Stream 统计词频要写一串 collector，Counter 一行。

### 6.5 datetime：日期时间

```python
from datetime import datetime, date, timedelta

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))   # 格式化

dt = datetime.strptime("2026-09-08", "%Y-%m-%d")   # 解析字符串

tomorrow = date.today() + timedelta(days=1)         # 时间运算
diff = datetime(2026, 12, 31) - datetime.now()
print(diff.days)              # 距年末还有多少天
```

常用格式符：`%Y` 年、`%m` 月、`%d` 日、`%H` 时、`%M` 分、`%S` 秒。`strftime` 是格式化输出，`strptime` 是解析输入，别记反。

### 6.6 itertools：迭代器工具箱

配合前面学的生成器/迭代器食用最佳：

```python
import itertools

list(itertools.chain([1, 2], [3, 4]))        # 串联：[1, 2, 3, 4]

# islice：惰性切片，可以截取无限迭代器
for x in itertools.islice(itertools.count(), 5):
    print(x)              # 0 1 2 3 4

list(itertools.permutations("ABC", 2))   # 排列
list(itertools.combinations("ABC", 2))   # 组合

# groupby：分组（必须先按 key 排序！）
data = [("a", 1), ("a", 2), ("b", 3)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))

list(itertools.product([1, 2], ["x", "y"]))   # 笛卡尔积
```

