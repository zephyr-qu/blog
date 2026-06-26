---
title: 设计模式| 门面模式
date: 2026-6-16
order: 6
---

# 门面模式 <Badge text="常用" type="warning" />

门面模式（Facade Pattern）为子系统中的一组接口提供一个统一的、简化的高层接口，从而让客户端更容易使用这个子系统。

### 优缺点

| 优点                                       | 缺点                                               |
| :----------------------------------------- | :------------------------------------------------- |
| 客户端只需与门面交互，无需了解复杂子系统   | 门面承担过多职责，违背单一职责原则                 |
| 客户端与子系统解耦，子系统变化不影响客户端 | 客户端若需要特殊配置，门面无法满足时反而增加复杂度 |
| 门面方法命名清晰，表达业务意图             | 子系统变化时门面可能需同步修改                     |
| 每层提供门面作为入口，层间依赖单一         | 为每个子系统都建门面，导致过度设计                 |
| 换门面实现即可更换整套子系统               |                                                    |

**适用场景**

- 需要为复杂子系统提供一个简单入口时。
- 客户端与多个子系统之间存在强依赖，希望通过门面解耦。
- 希望分层系统，用门面定义各层的入口点。
- 需要遗留系统与新系统之间做适配时。

###  与代理模式、适配器模式的区别

| 模式           | 目的                                 |
| :------------- | :----------------------------------- |
| **门面模式**   | 提供**简化接口**，封装复杂子系统     |
| **代理模式**   | 提供**相同接口**，控制访问或增强功能 |
| **适配器模式** | 转换接口，使**不兼容**的类能协同工作 |

### 门面模式

```java
// 子系统类：CPU
class CPU {
    public void start() { System.out.println("CPU 启动"); }
    public void shutdown() { System.out.println("CPU 关闭"); }
}

// 子系统类：内存
class Memory {
    public void load() { System.out.println("内存加载数据"); }
    public void unload() { System.out.println("内存卸载数据"); }
}

// 子系统类：硬盘
class HardDrive {
    public void read() { System.out.println("硬盘读取数据"); }
    public void write() { System.out.println("硬盘写入数据"); }
}

// 门面类：计算机
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    // 统一启动接口
    public void start() {
        cpu.start();
        memory.load();
        hardDrive.read();
        System.out.println("计算机启动完成");
    }

    // 统一关闭接口
    public void shutdown() {
        cpu.shutdown();
        memory.unload();
        hardDrive.write();
        System.out.println("计算机关闭完成");
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        computer.start();   // 一键启动，无需关心内部顺序
        computer.shutdown(); // 一键关闭
    }
}
```
