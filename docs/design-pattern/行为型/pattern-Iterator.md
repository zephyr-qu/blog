---
title: 设计模式| 迭代器模式
date: 2026-6-17
order: 5
---

# 迭代器模式 <Badge text="高频" type="danger" />

迭代器模式（Iterator Pattern）是一种行为型设计模式，它提供一种顺序访问聚合对象（集合）中各个元素的方法，而又不暴露其内部的表示。迭代器将遍历逻辑从集合中抽离出来，使得遍历算法可以独立于集合而变化。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 客户端无需了解集合内部结构 | 简单集合下可能增加不必要的复杂度 |
| 支持以多种方式遍历同一集合 | 遍历中修改集合可能引发并发修改异常 |
| 符合单一职责：遍历行为从集合分离 | 迭代器有状态，多线程需注意同步 |
| 可同时并行遍历多个集合 | 随机访问集合直接用索引更高效 |

**适用场景**

- 需要隐藏集合的内部数据结构，对外提供统一的遍历接口
- 需要为同一集合提供多种遍历方式（正序、倒序、过滤遍历等）
- 希望遍历代码与集合实现解耦，便于在不同集合类型间复用
- 需要统一不同数据结构的集合遍历方式

### 迭代器模式

```java
// ============ 迭代器接口 ============
interface Iterator<E> {
    boolean hasNext();
    E next();
}

// ============ 集合接口 ============
interface Aggregate<E> {
    Iterator<E> iterator();
}

// ============ 具体迭代器 ============
class ListIterator<E> implements Iterator<E> {
    private List<E> list;
    private int index;
    
    public ListIterator(List<E> list) {
        this.list = list;
        this.index = 0;
    }
    
    @Override
    public boolean hasNext() {
        return index < list.size();
    }
    
    @Override
    public E next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        return list.get(index++);
    }
}

// ============ 具体集合 ============
class MyList<E> implements Aggregate<E> {
    private List<E> items = new ArrayList<>();
    
    public void add(E item) {
        items.add(item);
    }
    
    @Override
    public Iterator<E> iterator() {
        return new ListIterator<>(items);
    }
}

// ============ 客户端 ============
public class IteratorDemo {
    public static void main(String[] args) {
        MyList<String> list = new MyList<>();
        list.add("A");
        list.add("B");
        list.add("C");
        
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

### Java 内置迭代器

Java 提供了 `java.util.Iterator` 和 `Iterable` 接口，所有集合类均实现了迭代器模式。

```java
import java.util.*;

public class JavaIteratorDemo {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Java", "Python", "Go");
        
        // 显式使用迭代器
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
        
        // for-each 本质也是迭代器
        for (String lang : list) {
            System.out.println(lang);
        }
    }
}

// 自定义类实现 Iterable，即可使用 for-each
class MyCollection<T> implements Iterable<T> {
    private List<T> items = new ArrayList<>();
    
    public void add(T item) { items.add(item); }
    
    @Override
    public Iterator<T> iterator() {
        return items.iterator();
    }
}
```

### 与访问者模式的区别

| 模式 | 关注点 |
| :--- | :--- |
| **迭代器模式** | 关注如何遍历集合元素，对外提供统一的顺序访问接口 |
| **访问者模式** | 关注对稳定的元素结构施加新操作，通过双分派确定元素类型和操作 |
| **for 循环** | 直接遍历，依赖底层数据结构，耦合度高 |

### 经典应用

- **Java Collection Framework**：`ArrayList`、`HashSet`、`LinkedList` 均通过 `iterator()` 返回 `Iterator` 实例
- **Java for-each 语法**：任何实现 `Iterable` 的类可用增强型 for 循环，编译后转为迭代器调用
- **Stream API**：内部迭代，将遍历逻辑完全交由框架处理
- **C++ STL 迭代器**：`begin()` / `end()` 配合算法库
- **Python 迭代协议**：`__iter__` / `__next__` 实现可迭代对象
