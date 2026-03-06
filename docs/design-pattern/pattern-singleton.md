---
title: 设计模式| 单例模式
date: 2026-2-1
order: 2
---

# 单例模式

单例模式（Singleton ）保证一个类仅有一个实例，并提供一个访问它的全局访问点。该模式通过私有化构造器、提供静态获取方法来实现对象的唯一性控制。



### 优缺点

**优点：**

1. 严格控制实例数量，节省系统资源
2. 全局访问点便于管理和扩展
3. 避免频繁创建销毁对象，提高性能

**缺点：**

1. 扩展困难且不易单元测试
2. 违背单一职责原则
3. 多线程环境下需要特殊处理



**应用场景**

1. 需要频繁创建销毁但又要控制数量的对象（线程池、缓存）
2. 需要全局访问点的共享资源（配置管理、日志系统）
3. 重量级资源对象（数据库连接池、文件系统）
4. 需要唯一实例的核心组件（任务管理器、设备驱动程序）



**分类**

单例设计模式总计分两种

- 饿汉式：类加载就会导致该单实例对象被创建	
- 懒汉式：类加载不会导致该单实例对象被创建，而是首次使用该对象时才会创建



### 饿汉模式（线程安全，推荐）

饿汉式在类加载时就创建实例，线程安全，但可能造成内存浪费。

```Java
public class HugryInstance {

    private static HugryInstance hugryInstance = new HugryInstance();

    private HugryInstance() {
    }

    public static HugryInstance getInstance() {
        return hugryInstance;
    }
}
```



### 懒汉模式（线程不安全，不推荐）

懒汉式在首次调用时创建实例，但不适用于多线程环境。

```Java
public class LazyInstanceNoSafe {

    private static LazyInstanceNoSafe instance;
    private LazyInstanceNoSafe() {
    }

    public static LazyInstanceNoSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceNoSafe();
        }
        return instance;
    }
}
```



### 懒汉模式（线程安全，不推荐）

通过同步锁解决线程安全问题，但性能较低。

```Java
public class LazyInstanceSafe {

    private static LazyInstanceSafe instance;
    private LazyInstanceSafe() {
    }

    public static synchronized LazyInstanceSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceSafe();
        }
        return instance;
    }
}
```



### 双重检查（线程安全，推荐）

双重检查锁在性能和线程安全之间取得平衡，属于懒汉模式。

```Java
public class LazyInstance {

    private static volatile LazyInstance instance;

    private LazyInstance() {
    }

    public static LazyInstance getInstance() {
        if (instance == null) {
            synchronized (LazyInstance.class) {
                if (instance == null) {
                    instance = new LazyInstance();
                }
            }
        }
        return instance;
    }
}
```



### 使用内部类模式（线程安全，推荐）

利用类加载机制实现延迟加载，线程安全且性能优越，属于懒汉模式。

```Java
public class InnerClzSingleton {
    private InnerClzSingleton(){
    }
    public static InnerClzSingleton getSingleton(){
        return Inner.instance;
    }
    private static class Inner {
        private static final InnerClzSingleton instance = new InnerClzSingleton();
    }
}
```



### 枚举方式（线程安全，推荐）

枚举是实现单例模式的最佳方式，天然支持线程安全和序列化。

```Java
private enum Singleton{
    INSTANCE;
    private SingletonExample singleton;
}
```
