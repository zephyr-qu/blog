---
title: 设计模式| 中介者模式
date: 2026-6-16
order: 12
---

# 中介者模式 <Badge text="低频" type="info" />

中介者模式（Mediator Pattern）用一个中介对象来封装一系列对象的交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，并且可以独立地改变它们之间的交互。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 降低多对象间的耦合，对象只需与中介者交互 | 中介者可能变得庞大复杂，承担所有控制逻辑 |
| 交互逻辑集中管理，便于维护和修改 | 中介者出问题则整个系统受影响 |
| 对象间一对多交互简化为一对一（对象 ↔ 中介者） | 过度使用会使中介者变成"上帝对象" |
| 新增同事类只需修改中介者（开闭原则的折中） | |

**适用场景**

- 多对象间形成网状依赖，相互引用混乱
- 对象间交互复杂且行为依赖运行时状态
- 希望通过中间层解耦通信双方
- 一组对象以定义良好但复杂的方式进行通信

### 网状 vs 星形通信

```
网状（无中介者）:
  A ←→ B ←→ C
  ↓     ↓     ↓
  D ←→ E ←→ F
  每个对象都需知道其他所有对象

星形（中介者）:
       Mediator
      /   |   \
    A     B     C
    |  /     \  |
    D     E     F
  对象只与中介者通信
```

### 中介者模式

```java
import java.util.ArrayList;
import java.util.List;

// 中介者接口
interface Mediator {
    void sendMessage(String message, User sender);
}

// 具体中介者：聊天室
class ChatRoom implements Mediator {
    private final List<User> users = new ArrayList<>();

    public void addUser(User user) {
        users.add(user);
    }

    @Override
    public void sendMessage(String message, User sender) {
        for (User user : users) {
            // 不转发给自己
            if (user != sender) {
                user.receive(message, sender);
            }
        }
    }
}

// 同事类
abstract class User {
    protected String name;
    protected Mediator mediator;

    public User(String name, Mediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public abstract void send(String message);
    public abstract void receive(String message, User sender);
}

// 具体同事
class ChatUser extends User {
    public ChatUser(String name, Mediator mediator) {
        super(name, mediator);
    }

    @Override
    public void send(String message) {
        System.out.println(name + " 发送: " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receive(String message, User sender) {
        System.out.println(name + " 收到来自 " + sender.name + ": " + message);
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        ChatRoom chatRoom = new ChatRoom();

        User alice = new ChatUser("Alice", chatRoom);
        User bob   = new ChatUser("Bob", chatRoom);
        User charlie = new ChatUser("Charlie", chatRoom);

        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        alice.send("大家好！");
        // Bob 收到来自 Alice: 大家好！
        // Charlie 收到来自 Alice: 大家好！
    }
}
```

### 与观察者模式的区别

| 模式 | 通信方式 | 关系 |
| :--- | :--- | :--- |
| **中介者模式** | 对象 ↔ 中介者 ↔ 对象 | 多对多集中管理 |
| **观察者模式** | 主题 → 观察者 | 一对多广播 |

### 经典应用

- **MVC 架构**：Controller 作为 Model 和 View 的中介者
- **消息中间件**：Kafka / RabbitMQ 解耦生产者和消费者
- **Java java.util.Timer**：协调任务的调度和执行
- **GUI 组件**：对话框作为中介者协调按钮、输入框等子组件
