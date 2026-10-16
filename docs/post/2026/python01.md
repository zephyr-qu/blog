---
title: 学点| Python 入门（一）
date: 2026-6-16
categories: 
  - 随笔感想
order: 6
---

# 学点| Python 入门（一）

:::tip 前言

上次学了C语言 意犹未尽，趁着AI 浪潮来袭，这次我们学习 Python😀

:::

## 一、Python 简介

### 1.1 什么是 Python？

**Python 是一种高级编程语言**，设计哲学是“代码可读性优先”，用接近自然语言的简洁语法让开发者高效解决问题。

#### 三个核心特点

- **语法极简**：用缩进代替花括号，强制代码整洁
- **开箱即用**：内置大量功能 + 大量第三方库
- **跨平台通用**：一份代码可在 Windows/macOS/Linux 运行

### 1.2 Python 的历史和发展

Python 由荷兰程序员 **Guido van Rossum** 于 1989 年圣诞节期间开始设计，初衷是创造一种比 ABC 语言更简洁、可扩展的脚本语言。1991 年发布首个开源版本 0.9.0，已包含类、异常处理等核心特性。

2000 年 Python 2.0 发布，引入列表推导式和垃圾回收，生态开始壮大。2008 年推出 **Python 3.0**，为解决语言设计遗留问题进行了不兼容重构（如统一 Unicode、`print` 改为函数），但因迁移成本高，推广缓慢。

2020 年后，Python 借 AI 浪潮爆发式增长，成为机器学习、数据科学的事实标准语言。

## 二、Python 前置知识

### 2.1 前置知识

#### 注释

Python中单行注释以 **#** 开头，多行注释可以用多个 **#** 号，还有 **'''** 和 **"""**

::: tip 提示

**'''** 和 **"""**，本质是多行字符串，不过可以用在注释多行文本。

:::

```python
# 我是单行注释

'''
我是多
行文本
'''

"""
我是多
行文本
"""
```

#### 标识符

- 第一个字符必须是字母表中字母或下划线 **\_** 。
- 标识符的其他的部分由字母、数字和下划线组成。
- 标识符对大小写敏感。
- 标识符名称不能是保留字。

#### 行与缩进

:::warning 注意

不规范的空格可能引起程序运行错误

:::

python 最具特色的就是使用缩进来表示代码块，缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数，默认为四个空格。

> 这是 Python 最独特的一点，也是最让人诟病的一点🤔

```python
if True:
    print("Answer")
    print("True")
else:
    print("Answer")
    print("False")
```

#### 多行语句

Python 可以使用反斜杠 \ 来实现多行语句，在 \[], {}, 或 () 中的多行语句，则不需要

```python
total = 'item_one + \
        item_two + \
        item_three'

total = ['item_one', 'item_two', 'item_three',
         'item_four', 'item_five']
```

#### 空行 与 pass 语句

##### 空行

- 空行用于分隔函数之间、类的方法之间或不同功能逻辑的代码，表示一段新代码的开始。
- 空行不是 Python 语法的一部分（与缩进不同），不写空行程序也能正常运行。
- 空行的作用在于分隔不同功能或含义的代码，提升可读性，便于日后维护或重构。

##### pass 语句

- pass 是空语句，不执行任何操作，一般用作占位符，保持程序结构的完整性。
- 在语法上必须有语句（但暂时不想实现功能）的位置，可用 pass 占位，避免程序因空块而报错。

```python
# 示例：函数体暂未实现，用 pass 占位
def todo():
    pass  # 什么都不做，避免空函数报错
```



#### print 输出

python 使用 **print** 来格式化输出，**print** 默认输出是换行的

```python
print('hello,world')
```

## 三、变量和常量

Python 中的变量不需要声明。变量在赋值后才被创建，变量类型属于所引用的对象，因此同一个变量可以先后指向不同类型的对象。

```python
x = 10          # x 指向整数
x = "hello"     # x 转而指向字符串，无需重新声明
```

#### 多变量赋值

Python允许同时为多个变量赋值。

```python
a = b = c = 1

a, b, c = 1, 2, "runoob"
```

### 3.1 基本数据类型

Python3 的六个标准数据类型中：

- **不可变数据（3 个）**：Number（数字）、String（字符串）、Tuple（元组）；
- **可变数据（3 个）**：List（列表）、Dictionary（字典）、Set（集合）。

| 类型    | <br />                             |
| ----- | ---------------------------------- |
| 文本类型  | `str`                              |
| 数值类型  | `int`, `float`, `complex`          |
| 序列类型  | `list`, `tuple`, `range`           |
| 映射类型  | `dict`                             |
| 集合类型  | `set`, `frozenset`                 |
| 布尔类型  | `bool`                             |
| 二进制类型 | `bytes`, `bytearray`, `memoryview` |

::: tip 注意

Python3 中，bool 是 int 的子类，True 和 False 可以和数字相加，`True == 1`、`False == 0` 会返回 **True**，但可以通过 **is** 来判断类型。

:::

#### String（字符串）

Python中的字符串用单引号 `'`或双引号 `"` 括起来，同时使用反斜杠 `\` 转义特殊字符。

```python
str = 'hello,world'

print(str)          # 输出字符串
print(str * 2)      # 输出字符串两次，同 print(2 * str)
print(str + "TEST") # 连接字符串
```

<br />

#### List（列表）

列表（List） 是 Python 中使用最频繁的数据类型。列表中元素的类型可以不相同，它支持数字，字符串甚至可以嵌套。

列表支持切片：

```python
list[头下标:尾下标]
```

示例

```python
# 索引值以 `0` 为开始值，`-1` 为从末尾的开始位置
list = ['abcd', 786, 2.23, 'runoob', 70.2]
tinylist = [123, 'runoob']

print(list)          # 输出完整列表
print(list[0])       # 输出列表第一个元素
print(list[1:3])     # 从第二个开始输出到第三个元素
print(list[2:])      # 输出从第三个元素开始的所有元素
print(tinylist * 2)  # 输出两次列表
print(list + tinylist)  # 连接列表
```

#### Tuple（元组）

元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号 `()` 里。

```python
tup1 = ()    # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```

#### Set（集合）

集合（Set）是一种无序、可变的数据类型，用于存储唯一的元素。集合使用大括号 `{}` 表示，也可以使用 `set()` 函数创建集合。

> 提示：创建一个空集合必须用 `set()` 而不是 `{ }`，因为 `{ }` 是用来创建一个空字典。

```python
parame = {value01, value02, ...}
# 或者
set(value)
```

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}

print(sites)  # 输出集合，重复的元素被自动去掉

# 成员测试
if 'Runoob' in sites:
    print('Runoob 在集合中')
else:
    print('Runoob 不在集合中')

# set 可以进行集合运算
a = set('abracadabra')
b = set('alacazam')

print(a)
print(a - b)   # a 和 b 的差集
print(a | b)   # a 和 b 的并集
print(a & b)   # a 和 b 的交集
print(a ^ b)   # a 和 b 中不同时存在的元素
```

#### Dictionary（字典）

字典（dictionary）是一个非常有用的内置数据类型。字典是无序的对象集合，用 `{}` 标识。

注意：

- 1、字典是一种映射类型，它的元素是键值对。
- 2、字典的关键字必须为不可变类型，且不能重复。
- 3、创建空字典使用 `{}`。

```python
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2] = "2 - 菜鸟工具"

tinydict = {'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}

print(dict['one'])        # 输出键为 'one' 的值
print(dict[2])            # 输出键为 2 的值
print(tinydict)           # 输出完整的字典
print(tinydict.keys())    # 输出所有键
print(tinydict.values())  # 输出所有值
```

#### bytes 类型

bytes 是不可变的二进制序列，元素为 0 到 255 的整数，常用于处理图像、音频等二进制数据及网络传输。

创建 bytes 对象主要有两种方式：

- **使用 b 前缀直接创建字节字面量**
- **使用 bytes() 函数将其他类型转换为 bytes**

bytes 支持切片、拼接等操作；因不可变，修改时需生成新的对象。

```python
x = b"hello"
y = x[1:3]            # 切片操作，得到 b"el"
z = x + b"world"      # 拼接操作，得到 b"helloworld"
```

> 注意：bytes 的元素是整数值，比较时需使用对应的整数值，可通过 ord() 将字符转换为整数值。



### 3.2 数据类型转换

对数据内置的类型进行转换，只需要将数据类型作为函数名即可

| 函数                     | 描述                               |
| :--------------------- | :------------------------------- |
| int(x \[,base])        | 将x转换为一个整数                        |
| float(x)               | 将x转换到一个浮点数                       |
| complex(real \[,imag]) | 创建一个复数                           |
| str(x)                 | 将对象 x 转换为字符串                     |
| repr(x)                | 将对象 x 转换为表达式字符串                  |
| eval(str)              | 用来计算在字符串中的有效Python表达式,并返回一个对象    |
| tuple(s)               | 将序列 s 转换为一个元组                    |
| list(s)                | 将序列 s 转换为一个列表                    |
| set(s)                 | 转换为可变集合                          |
| dict(d)                | 创建一个字典。d 必须是一个 (key, value)元组序列。 |
| frozenset(s)           | 转换为不可变集合                         |
| chr(x)                 | 将一个整数转换为一个字符                     |
| ord(x)                 | 将一个字符转换为它的整数值                    |
| hex(x)                 | 将一个整数转换为一个十六进制字符串                |
| oct(x)                 | 将一个整数转换为一个八进制字符串                 |

## 四、运算符和表达式

### 算术运算符

| 运算符  | 描述                        |
| :--- | :------------------------ |
| +    | 加 - 两个对象相加                |
| -    | 减 - 得到负数或是一个数减去另一个数       |
| \*   | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 |
| /    | 除 - x 除以 y                |
| %    | 取模 - 返回除法的余数              |
| \*\* | 幂 - 返回x的y次幂               |
| //   | 取整除 - 往小的方向取整数            |

### 比较运算符

| 运算符 | 描述                 |
| :-- | :----------------- |
| ==  | 等于 - 比较对象是否相等      |
| !=  | 不等于 - 比较两个对象是否不相等  |
| >   | 大于 - 返回x是否大于y      |
| <   | 小于 - 返回x是否小于y。     |
| >=  | 大于等于 - 返回x是否大于等于y。 |
| <=  | 小于等于 - 返回x是否小于等于y。 |

### 赋值运算符

| 运算符   | 描述                 | 实例                           |
| :---- | :----------------- | :--------------------------- |
| =     | 简单的赋值运算符           | c = a + b 将 a + b 的运算结果赋值为 c |
| +=    | 加法赋值运算符            | c += a 等效于 c = c + a         |
| -=    | 减法赋值运算符            | c -= a 等效于 c = c - a         |
| \*=   | 乘法赋值运算符            | c \*= a 等效于 c = c \* a       |
| /=    | 除法赋值运算符            | c /= a 等效于 c = c / a         |
| %=    | 取模赋值运算符            | c %= a 等效于 c = c % a         |
| \*\*= | 幂赋值运算符             | c \*\*= a 等效于 c = c \*\* a   |
| //=   | 取整除赋值运算符           | c //= a 等效于 c = c // a       |
| :=    | 海象运算符，可在表达式内部为变量赋值 | <br />                       |

#### 位运算符

按位运算符是把数字看作二进制来进行计算的。Python中的按位运算法则如下：

| 运算符 | 描述                                                     | 实例                                                  |
| :-- | :----------------------------------------------------- | :-------------------------------------------------- |
| &   | 按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0               | (a & b) 输出结果 12 ，二进制解释： 0000 1100                   |
| \|  | 按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1。                        | (a \| b) 输出结果 61 ，二进制解释： 0011 1101                  |
| ^   | 按位异或运算符：当两对应的二进位相异时，结果为1                               | (a ^ b) 输出结果 49 ，二进制解释： 0011 0001                   |
| \~  | 按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1。**\~x** 类似于 **-x-1** | (\~a ) 输出结果 -61 ，二进制解释： 1100 0011， 在一个有符号二进制数的补码形式。 |
| <<  | 左移动运算符：运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。     | a << 2 输出结果 240 ，二进制解释： 1111 0000                   |
| >>  | 右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数         | a >> 2 输出结果 15 ，二进制解释： 0000 1111                    |

### 逻辑运算符

Python语言支持逻辑运算符，以下假设变量 a 为 10, b为 20:

| 运算符 | 逻辑表达式   | 描述                                                   | 实例                    |
| :-- | :------ | :--------------------------------------------------- | :-------------------- |
| and | x and y | 布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。    | (a and b) 返回 20。      |
| or  | x or y  | 布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。           | (a or b) 返回 10。       |
| not | not x   | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 | not(a and b) 返回 False |

### 成员运算符

Python还支持成员运算符，测试实例中包含了一系列的成员，包括字符串，列表或元组。

| 运算符    | 描述                                | 实例                                 |
| :----- | :-------------------------------- | :--------------------------------- |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False。   | x 在 y 序列中 , 如果 x 在 y 序列中返回 True。   |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False。 | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。 |

### 身份运算符

身份运算符用于比较两个对象的存储单元

| 运算符    | 描述                        | 实例                                                                        |
| :----- | :------------------------ | :------------------------------------------------------------------------ |
| is     | is 是判断两个标识符是不是引用自一个对象     | **x is y**, 类似 **id(x) == id(y)** , 如果引用的是同一个对象则返回 True，否则返回 False        |
| is not | is not 是判断两个标识符是不是引用自不同对象 | **x is not y** ， 类似 **id(x) != id(y)**。如果引用的不是同一个对象则返回结果 True，否则返回 False。 |

## 五、控制流程语句

### 条件语句

#### if 语句

**注意：**

- 每个条件后面要使用冒号 **:**，表示接下来是满足条件后要执行的语句块。
- 使用缩进来划分语句块，相同缩进数的语句在一起组成一个语句块。

```python
# 单分支
var1 = 100
if var1:
    print("1 - if 表达式条件为 true")
print(var1)

# 双分支
var2 = 0
if var2:
    print(var2)
else:
    print("Good bye!")

# 多分支
var3 = 0
if var3 == 1:
    print("var3 等于 1")
elif var3 == 0:
    print("var3 等于 0")
else:
    print("var3 不等于 1 和 0")
```

#### if 嵌套

在嵌套 if 语句中，可以把 if...elif...else 结构放在另外一个 if...elif...else 结构中。

```python
num = int(input("输入一个数字："))
if num % 2 == 0:
    if num % 3 == 0:
        print("你输入的数字可以整除 2 和 3")
    else:
        print("你输入的数字可以整除 2，但不能整除 3")
else:
    if num % 3 == 0:
        print("你输入的数字可以整除 3，但不能整除 2")
    else:
        print("你输入的数字不能整除 2 和 3")
```

#### match...case <Badge text="3.10"/>

match 后的对象会依次与 case 后的内容进行匹配，如果匹配成功，则执行匹配到的表达式，否则直接跳过，**\_** 可以匹配一切。

```python
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"

print(http_error(400))

# 一个 case 也可以设置多个匹配条件，条件使用 | 隔开
def http_error2(status):
    match status:
        case 401 | 403 | 404:
            return "Not allowed"
        case _:
            return "Something's wrong with the internet"
```

### 循环语句

Python 中的循环语句有 for 和 while。

#### while 循环

Python 中 while 语句的一般形式

> 同样需要注意冒号和缩进。

```python
n = 100
sum = 0
counter = 1
while counter <= n:
    sum = sum + counter
    counter += 1
print("1 到 %d 之和为: %d" % (n, sum))
```



#### for 语句

Python for 循环可以遍历任何可迭代对象，如一个列表或者一个字符串。

```python
sites = ["Baidu", "Google", "Runoob", "Taobao"]
for site in sites:
    print(site)
```

<br />

#### range() 函数

如果你需要遍历数字序列，可以使用内置 range() 函数。

```python
for i in range(5):
    print(i)

# 可以使用 range() 指定区间的值
for i in range(5, 9):
    print(i)

# 可以使用 range() 以指定数字开始并指定步长
for i in range(0, 10, 3):
    print(i)

for i in range(-10, -100, -30):
    print(i)

# 可以结合 range() 和 len() 函数遍历一个序列的索引
sites = ["Baidu", "Google", "Runoob", "Taobao"]
for i in range(len(sites)):
    print(i, sites[i])
```

#### break 和 continue 语句及循环中的 else 子句

##### break 语句

**break** 用于跳出当前 for 或 while 循环体，循环内剩余语句不再执行。

> 注意：若循环是被 break 终止的，则对应的 else 子句不会执行。

```python
for i in range(5):
    if i == 3:
        break        # i 等于 3 时跳出循环
    print(i)         # 输出 0 1 2
else:
    print("循环正常结束")  # 不会执行
```

##### continue 语句

**continue** 用于跳过当前循环迭代中剩余的语句，直接进入下一轮循环。

```python
for i in range(5):
    if i == 3:
        continue     # 跳过 i 等于 3 时后续语句
    print(i)         # 输出 0 1 2 4
```

##### 循环中的 else 子句

for / while 循环可以带 **else** 子句：当循环正常结束（未被 break 中断）时才执行，常用于判断循环是否提前退出。

## 六、函数和作用域

你可以定义一个由自己想要功能的函数，以下是简单的规则：

- 函数代码块以 **def** 关键词开头，后接函数标识符名称和圆括号 **()**。
- 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
- 函数内容以冒号 **:** 起始，并且缩进。
- **return \[表达式]** 结束函数，选择性地返回一个值给调用方，不带表达式的 return 相当于返回 None。

#### 语法

Python 定义函数使用 def 关键字

> 默认情况下，参数值和参数名称是按函数声明中定义的顺序匹配起来的。

```python
def hello():
    print("Hello World!")

hello()

def max(a, b):
    if a > b:
        return a
    else:
        return b

a = 4
b = 5
print(max(a, b))
```



#### 参数传递

以下是调用函数时可使用的正式参数类型：

- 必需参数
- 关键字参数
- 默认参数
- 不定长参数
- 强制位置参数

#### 必需参数

必需参数须以正确的顺序传入函数。调用时的数量必须和声明时的一样。

```python
# 可写函数说明
def printme(str):
    "打印任何传入的字符串"
    print(str)
    return

# 调用 printme 函数，不加参数会报错
printme()
```

#### 关键字参数

关键字参数和函数调用关系紧密，函数调用使用关键字参数来确定传入的参数值。

```python
# 可写函数说明
def printme(str):
    "打印任何传入的字符串"
    print(str)
    return

# 调用 printme 函数
printme(str="菜鸟教程")

# 可写函数说明
def printinfo(name, age):
    "打印任何传入的字符串"
    print("名字: ", name)
    print("年龄: ", age)
    return

# 调用 printinfo 函数
printinfo(age=50, name="runoob")
```

#### 默认参数

调用函数时，如果没有传递参数，则会使用默认参数。

```python
# 可写函数说明
def printinfo(name, age=35):
    "打印任何传入的字符串"
    print("名字: ", name)
    print("年龄: ", age)
    return

# 调用 printinfo 函数
printinfo(age=50, name="runoob")
print("------------------------")
printinfo(name="runoob")
```

#### 不定长参数

一个函数能处理比当初声明时更多的参数，这些参数叫做不定长参数

```python
def functionname(*var_args_tuple):
    "函数_文档字符串"
    function_suite
    return [expression]
```

一个星号 \* 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数。

```python
# 可写函数说明
def printinfo(arg1, *vartuple):
    "打印任何传入的参数"
    print("输出: ")
    print(arg1)
    print(vartuple)

# 调用 printinfo 函数
printinfo(70, 60, 50)
```

两个星号 \*\* 的参数会以字典的形式导入。

```python
# 可写函数说明
def printinfo(arg1, **vardict):
    "打印任何传入的参数"
    print("输出: ")
    print(arg1)
    print(vardict)

# 调用 printinfo 函数
printinfo(1, a=2, b=3)
```

声明函数时，如果单独出现星号 \*，则星号 \* 后的参数必须用关键字传入：

```python
def f(a, b, *, c):
    return a + b + c

f(1, 2, 3)   # 报错，c 必须用关键字传入
f(1, 2, c=3) # 正常
```

#### 强制位置参数

**/** 用来指明其前的函数形参必须使用指定位置参数，不能使用关键字参数的形式。

在以下的例子中，形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 和 f 要求为关键字形参：

```python
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)
```

#### return 语句

**return \[表达式]** 语句用于退出函数，选择性地向调用方返回一个表达式。

```python
# 可写函数说明
def sum(arg1, arg2):
    # 返回 2 个参数的和
    total = arg1 + arg2
    print("函数内 : ", total)
    return total

# 调用 sum 函数
total = sum(10, 20)
print("函数外 : ", total)
```

> 学到函数就行了，下次我们再学习类吧。

