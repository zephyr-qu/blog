---
title: 设计模式| 观察者模式
date: 2026-6-17
order: 5
---

# 观察者模式 <Badge text="高频" type="danger" />

观察者模式（Observer Pattern）属于行为型设计模式，定义对象间一种一对多的依赖关系，使得当一个对象（被观察者，Subject）的状态发生变化时，所有依赖它的对象（观察者，Observer）都会收到通知并自动更新。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 观察者和被观察者之间抽象耦合，双方只需依赖接口而非具体实现 | 观察者过多时通知耗时，可能影响性能 |
| 支持广播通信，被观察者无需关心观察者数量和处理逻辑 | 观察者之间依赖细节可能引发循环依赖和循环调用 |
| 符合开闭原则，新增观察者无需修改被观察者 | 通知顺序不可控，观察者更新顺序依赖注册顺序 |
| 可在运行时动态建立/解除观察关系 | 内存泄漏风险：观察者未及时注销导致对象无法被 GC 回收 |

**适用场景**

- 对象状态变化需要通知多个其他对象，且不知道具体有多少对象需要通知
- 一个对象状态更新时，其他关联对象需自动更新
- 需要实现事件驱动的编程模型
- GUI 框架中事件监听与响应
- 跨系统消息通知与广播


### 观察者模式

```java
import java.util.ArrayList;
import java.util.List;

// 具体被观察者 — 博客
public class Blog implements Subject {
    private final String title;
    private final List<Observer> observers = new ArrayList<>();

    public Blog(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(Object arg) {
        for (Observer observer : observers) {
            observer.update(this, arg);
        }
    }

    public void comment(Comment comment) {
        System.out.println(comment.getNickname() + " 评论了 <" + title + "> ，评论内容：" + comment.getValue());
        notifyObservers(comment);
    }
}

// 评论类
public class Comment {
    private final String nickname;
    private final String value;

    public Comment(String nickname, String value) {
        this.nickname = nickname;
        this.value = value;
    }

    public String getNickname() {
        return nickname;
    }

    public String getValue() {
        return value;
    }
}

// 具体观察者 — 作者
public class Author implements Observer {
    private final String name;

    public Author(String name) {
        this.name = name;
    }

    @Override
    public void update(Subject subject, Object arg) {
        Blog blog = (Blog) subject;
        Comment comment = (Comment) arg;
        System.out.println("系统感知到 " + name + " 的博文 <" + blog.getTitle()
                + "> 收到了 " + comment.getNickname() + " 的评论，评论内容：" + comment.getValue());
    }
}

// 测试客户端
public class Application {
    public static void main(String[] args) {
        Blog blog = new Blog("Java 从入门到放弃");
        Author author = new Author("MrBird");

        blog.registerObserver(author);

        Comment comment = new Comment("Scott", "感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。");
        blog.comment(comment);
    }
}
```

**输出：**
```
Scott 评论了 <Java 从入门到放弃> ，评论内容：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
系统感知到 MrBird 的博文 <Java 从入门到放弃> 收到了 Scott 的评论，评论内容：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
```


### 经典应用

- **GUI 事件监听**：Java AWT/Swing 的 `EventListener` 模型是观察者模式的标准应用，按钮点击、鼠标移动等事件通过监听器机制通知注册的处理器
- **Spring ApplicationListener**：Spring 框架的 `ApplicationListener` / `ApplicationEvent` 实现了事件发布与监听，事件发布后所有注册的监听器异步接收处理
- **消息队列（MQ）**：消息中间件（如 RabbitMQ、Kafka）本质上是发布-订阅模式，生产者和消费者通过消息代理解耦
- **RxJava / Reactive Streams**：响应式编程中的 `Observable` / `Observer` 是观察者模式的扩展，支持异步数据流和背压策略

### 与相关模式的对比

| 模式 | 通信方式 | 耦合度 | 中间角色 |
| :--- | :--- | :--- | :--- |
| **观察者模式** | 一对多广播，Subject 直接通知 Observer | Subject 与 Observer 通过接口耦合 | 无中间角色，Subject 同时维护观察者列表 |
| **发布-订阅模式** | 一对多广播，通过消息通道（Channel/Broker）中转 | 发布者和订阅者完全解耦，互不知晓对方 | 存在消息通道/代理（Channel/Broker）做中转 |
| **中介者模式** | 多对多通信，通过 Mediator 转发 | 所有同事对象通过中介者解耦 | Mediator 作为通信中枢，协调多对象间的交互 |

> **说明**：发布-订阅模式可以看作是观察者模式的一种解耦变体。观察者模式中 Subject 持有 Observer 的引用（紧耦合通知），而发布-订阅模式引入 Broker 作为中间层，发布者和订阅者之间完全不感知对方存在。
