---
title: 设计模式| 命令模式
date: 2026-6-17
order: 7
---

# 命令模式 <Badge text="常用" type="warning" />

命令模式（Command Pattern）将请求封装为一个对象，从而允许用不同的请求对客户端进行参数化、对请求排队或记录请求日志，以及支持可撤销操作。它将请求发送者与接收者解耦，使两者不直接交互。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 发送者与接收者完全解耦，降低系统耦合度 | 可能导致系统出现过多具体命令类，增加类的数量 |
| 支持命令的撤销、重做、排队和日志记录 | 如果命令逻辑简单，引入命令模式会过度设计 |
| 可组合多个命令形成复合命令（宏命令） | 客户端需要知道如何创建具体命令及绑定接收者 |
| 新增命令无需修改现有代码，符合开闭原则 | |

**适用场景**

- 需要将操作参数化，支持延迟执行或远程执行
- 需要支持撤销/重做功能
- 需要支持事务操作或操作日志
- 需要构建宏命令或命令队列
- 需要为系统的操作提供统一的扩展点

### 命令模式 vs 策略模式

| 模式 | 意图 | 关注点 |
| :--- | :--- | :--- |
| **命令模式** | 将请求封装为对象，支持排队/撤销 | 执行什么操作及如何执行 |
| **策略模式** | 封装可互换的算法，让客户端选择 | 如何完成某件事的不同方式 |

### 命令模式

```java
// 接收者：电灯
class Light {
    public void on() {
        System.out.println("电灯打开");
    }
    public void off() {
        System.out.println("电灯关闭");
    }
}

// 命令接口
interface Command {
    void execute();
    void undo();
}

// 具体命令：开灯
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        light.off();
    }
}

// 具体命令：关灯
class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        light.on();
    }
}

// 调用者：遥控器
class RemoteControl {
    private Command command;
    private Command lastCommand;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
        lastCommand = command;
    }

    public void pressUndo() {
        if (lastCommand != null) {
            lastCommand.undo();
        }
    }
}

// 使用示例
public class CommandDemo {
    public static void main(String[] args) {
        Light light = new Light();
        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();  // 电灯打开

        remote.setCommand(lightOff);
        remote.pressButton();  // 电灯关闭

        remote.pressUndo();    // 电灯打开（撤销关灯）
    }
}
```

### 经典应用

- **Java Runnable**：`Runnable` 接口可视为命令模式的应用，将任务封装为对象提交给线程执行
- **GUI 按钮操作**：Swing/AWT 中的 `Action` 和 `ActionListener` 将用户操作封装为命令
- **事务操作**：数据库事务中的 commit/rollback 体现了命令模式的撤销机制
- **任务队列**：线程池将任务封装为命令对象，支持排队、调度和异步执行
