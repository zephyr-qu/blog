---
title: 学点| Python 入门（二）
date: 2026-9-8
categories: 
  - 随笔感想
order: 7
---

# 学点| Python 入门（二）

:::tip 前言

这次我们来 **面向对象**。

:::

## 一、类与实例

### 1.1 类

直接上代码，一个最典型的 Python 类：

```python
class Dog:
    # 类属性：所有实例共享
    species = "Canis familiaris"

    # 构造方法：创建实例时自动调用
    def __init__(self, name, age):
        self.name = name   # 实例属性：每个实例独立
        self.age = age

    # 实例方法：第一个参数必须是 self
    def bark(self):
        return f"{self.name} 在汪汪叫"

# 创建实例：不需要 new 关键字
dog1 = Dog("旺财", 3)
dog2 = Dog("小黑", 5)

print(dog1.name)          # 旺财
print(dog1.bark())        # 旺财 在汪汪叫
print(Dog.species)        # Canis familiaris
```

- **构造方法叫** **`__init__`**：前后各两个下划线，写错成 `init` 是新手常见
- **`self`** **要显式写**：每个实例方法的第一个参数都是它

### 1.2 self 

`self` 就是"当前这个实例本身"，相当于 Java 里的 `this`。

```python
dog1.bark()
# 等价于
Dog.bark(dog1)   # dog1 被自动传给了 self 参数
```

### 1.3 类属性 vs 实例属性

- **类属性**：定义在类下面，所有实例共享一份，适合放"大家都一样"的数据
- **实例属性**：一般在 `__init__` 里用 `self.xxx` 创建，每个实例各有一份

有个容易踩的坑：给实例赋值同名属性，会在实例上创建**新的**实例属性，把类属性"遮住"，而不会修改类属性：

```python
dog1.species = "Wolf"   # 这是在 dog1 上新建了实例属性
Dog.species             # 还是 "Canis familiaris"，没变

# 想改类属性，必须用类名
Dog.species = "Canis lupus"
```

## 二、魔术方法

魔术方法是 Python 预留的特殊方法，名字前后各两个下划线（所以也叫"双下方法"）。它们不需要你手动调用，而是由 Python 在特定时机自动触发：

| 魔术方法       | 触发时机                  |
| ---------- | --------------------- |
| `__init__` | 创建实例时                 |
| `__str__`  | `print(实例)` / `str()` |
| `__repr__` | 调试显示，`repr()`         |
| `__len__`  | `len(实例)`             |
| `__eq__`   | `==` 比较               |

最常用的是 `__str__` 和 `__repr__`，直接打印对象时会用到：

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Dog({self.name}, {self.age})"

    def __repr__(self):
        return f"Dog(name={self.name!r}, age={self.age})"

dog = Dog("旺财", 3)
print(dog)          # 调用 __str__ → Dog(旺财, 3)
repr(dog)           # 调用 __repr__，调试用
```

## 三、属性访问控制

Python 没有真正的私有属性，靠的是**下划线约定**：

- `_name`：单下划线，"受保护"，约定不要在外部访问，但你访问也没人拦
- `__name`：双下划线，触发**名称改写**（name mangling），实际会变成 `_ClassName__name`

### 3.1 双下划线的改名机制

```python
class Person:
    def __init__(self, name):
        self.__name = name  # 实际存储为 _Person__name

    def get_name(self):
        return self.__name

p = Person("Alice")
# p.__name 会报错，实际可通过 p._Person__name 访问（不推荐）
print(p.__dict__)   # {'_Person__name': 'Alice'}，一眼看清真名
```

`p.__name` 报错不是因为"私有了"，而是属性的真实名字已经变成了 `_Person__name`，用旧名字当然找不到。**改写不是加密，只是提高了误用的门槛**。

它真正有用的场景是**避免继承时的属性名冲突**：父类和子类各写各的 `__name`，改写后互不干扰。

日常写业务代码，单下划线 `_name` 就够用了。

## 四、继承与多态

### 4.1 继承

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} 发出声音"

class Dog(Animal):
    # 覆盖父类方法（多态）
    def speak(self):
        return f"{self.name} 汪汪叫"

class Cat(Animal):
    def speak(self):
        return f"{self.name} 喵喵叫"

animals = [Dog("旺财"), Cat("小花")]
for a in animals:
    print(a.speak())   # 同样的调用，行为不同 → 多态
```

语法就是 `class Dog(Animal)`，括号里写父类，比 Java 的 `extends` 还简洁。

### 4.2 super() 调用父类

子类 `__init__` 想复用父类的初始化逻辑时，用 `super()`：

```python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # 调用父类 __init__
        self.breed = breed
```

:::warning 注意

`super().__init__()` 要放在子类 `__init__` 里，且**先于**自定义属性。忘了调用的话，父类的属性（如 `self.name`）根本不会被创建，后面用到就报错。

:::

### 4.3 多态与鸭子类型

Python 的多态更"野"——**不要求继承关系**，只要对象有那个方法就行，这叫**鸭子类型**：

```python
def make_sound(obj):
    return obj.speak()

make_sound(Dog("A"))   # 只要传入的对象有 speak() 即可
make_sound(Cat("B"))
```

> 走起来像鸭子、叫起来像鸭子，那它就是鸭子。Python 不检查"你是不是 Animal 的子类"，只检查"你有没有 speak 方法"。

写惯 Java 接口的人第一反应可能是"没有类型约束不会乱吗？"——会的，所以大型项目里通常配合类型注解和 `abc` 抽象基类来约束，这是后话了。

## 五、@property

### 5.1 @property

Python 用 `@property` 让你**先把属性直接暴露出去，以后随时可以无痛加逻辑**：

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):            # getter：读取 c.radius 时触发
        return self._radius

    @radius.setter
    def radius(self, value):     # setter：赋值 c.radius = 5 时触发
        if value < 0:
            raise ValueError("半径不能为负")
        self._radius = value

    @property
    def area(self):              # 只读属性：没有 setter，赋值会报错
        return 3.14 * self._radius ** 2

c = Circle(5)
print(c.radius, c.area)   # 用起来像普通属性，完全不用加括号
c.radius = 10             # 赋值时自动触发 setter 校验
```

- `@property` 装饰的方法是 **getter**，读取 `c.radius` 时自动调用
- `@radius.setter` 装饰的同名方法是 **setter**，赋值时自动调用
- 只有 getter 没有 setter 的 `area` 是**只读属性**，从 `self._radius` 现算出来

### 5.2 @radius.setter

`@radius.setter` 看着像特殊语法，其实就是普通的属性访问：`@property` 执行后，`radius` 已经不是函数，而是一个 `property` 对象，`.setter` 是这个对象自带的注册接口。上面那套写法等价于：

```python
radius = property(get_radius)     # 创建 property 对象
radius = radius.setter(set_radius)  # 注册 setter，返回新对象
```

:::tip 提示

`property` 对象还有个 `.deleter` 接口，用来注册 `del c.radius` 时触发的删除逻辑，用得很少，知道有这回事就行。

:::

## 六、类方法与静态方法

除了实例方法，Python 还有两种"不绑定实例"的方法：

```python
class Math:
    base = 10

    @classmethod
    def get_base(cls):           # 第一个参数是类 cls，可访问类属性
        return cls.base

    @staticmethod
    def add(a, b):               # 与类无关，仅逻辑归类
        return a + b

print(Math.get_base())   # 10
print(Math.add(1, 2))    # 3
```

| 类型                   | 第一个参数  | 访问           |
| -------------------- | ------ | ------------ |
| 实例方法                 | `self` | 实例属性和方法      |
| 类方法 `@classmethod`   | `cls`  | 类属性、可被子类继承   |
| 静态方法 `@staticmethod` | 无      | 与类实例无关，纯工具函数 |

怎么选：

- 要访问实例数据 → 实例方法
- 要访问/修改类级别的数据 → 类方法
- 和类、实例都没关系，只是"逻辑上归这个类管"的工具函数 → 静态方法

## 七、多重继承（了解）

Python 支持一个类继承多个父类：

```python
class A:
    def a(self): return "A"

class B:
    def b(self): return "B"

class C(A, B):   # 继承多个父类
    pass

c = C()
print(c.a(), c.b())   # A B
```

如果多个父类有同名方法，按 **MRO**（方法解析顺序）决定用谁的，可以用 `C.__mro__` 查看这个顺序。

> 多重继承的水很深，实际项目里更推荐用组合代替。这里了解即可，别上头。

