---
title: 设计模式| 原型模式
date: 2026-6-17
order: 6
---
# 原型模式 <Badge text="低频" type="info" />

用一个已经创建好的对象作为原型，通过**复制**这个原型来创建新对象，而不是通过 `new` 关键字。

### 优缺点

| 优点                               | 缺点                             |
| :--------------------------------- | :------------------------------- |
| 性能高，直接拷贝内存，避免复杂构造 | 必须实现克隆方法，类内部需要处理 |
| 动态克隆，运行时可以改变对象结构   | 深拷贝实现复杂，需处理循环引用   |
| 简化创建，无需知道产品具体类       | 克隆内部私有变量可能破坏封装性   |
|                                    | 需要维护克隆接口，增加代码量     |

**适用场景**

- 当通过更改现有对象更新指定的对象时。
- 加速大型动态加载类的实例化

### 浅拷贝

```java
// 引用对象
class Work {
    String company = "阿里";
}

// 原型
class Resume implements Cloneable {
    String name = "张三";
    Work work = new Work();  // 引用类型

    @Override
    public Resume clone() {
        try {
            return (Resume) super.clone();  // 浅拷贝
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

// 测试
public class Client {
    public static void main(String[] args) {
        Resume original = new Resume();
        Resume copy = original.clone();

        copy.name = "李四";
        copy.work.company = "腾讯";

        System.out.println(original.name);   // 张三（基本类型独立）
        System.out.println(original.work.company); // 腾讯（引用类型共享）
    }
}
```


### 深拷贝

```java
// 引用对象（也要实现 Cloneable）
class Work implements Cloneable {
    String company = "阿里";

    @Override
    public Work clone() {
        try {
            return (Work) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

// 原型
class Resume implements Cloneable {
    String name = "张三";
    Work work = new Work();

    @Override
    public Resume clone() {
        try {
            Resume cloned = (Resume) super.clone();
            cloned.work = this.work.clone();  // 关键：手动拷贝引用对象
            return cloned;
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

// 测试
public class Client {
    public static void main(String[] args) {
        Resume original = new Resume();
        Resume copy = original.clone();

        copy.name = "李四";
        copy.work.company = "腾讯";

        System.out.println(original.name);   // 张三
        System.out.println(original.work.company); // 阿里（不受影响）
    }
}
```


### 对比总结

| 类型   | 核心代码                       | 引用对象           |
| :----- | :----------------------------- | :----------------- |
| 浅拷贝 | `super.clone()`                | 共享，修改互相影响 |
| 深拷贝 | `super.clone()` + 手动拷贝引用 | 独立，互不影响     |


### 与其他创建型模式对比

| 模式 | 核心机制 | 适用场景 |
| :--- | :--- | :--- |
| **原型模式** | 克隆已有对象 | 创建成本高、需要动态配置的对象 |
| **工厂模式** | 子类决定实例化 | 产品种类多、需统一创建入口 |
| **建造者模式** | 分步骤构建 | 对象构造参数多、需定制组装过程 |

### 经典应用

- **Java Object.clone()**: 所有 Java 对象可通过 clone() 快速复制
- **Spring Prototype Bean Scope**: 每次获取都返回新实例
- **原型模式在游戏开发中**: 快速创建大量相似敌机/子弹等对象
- **图像编辑器的复制粘贴**: 复制当前选中对象作为新对象
