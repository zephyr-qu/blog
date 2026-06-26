---
title: 设计模式| 桥接模式
date: 2026-6-16
order: 8
---

# 桥接模式 <Badge text="低频" type="info" />

桥接模式（Bridge Pattern）将抽象部分与它的实现部分分离，使两者都可以独立地变化。它通过组合代替继承，解决因多维度变化导致的类爆炸问题。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 抽象与实现分离，各自独立扩展 | 增加系统复杂度，需额外设计和引入抽象层 |
| 符合开闭原则，新增维度无需修改现有代码 | 需正确识别出变化的维度，抽象设计较难把握 |
| 实现细节对客户端透明 | 多层抽象组合可能导致理解成本增加 |
| 组合优于继承，减少子类数量 | |

**适用场景**

- 一个类存在两个或多个独立变化的维度，且都需要扩展
- 不希望使用继承导致子类爆炸时
- 需要运行时动态切换实现
- 多个类共享同一套实现，但抽象接口不同

### 桥接模式 vs 继承

假设有 **形状** 和 **颜色** 两个维度，每种形状都有多种颜色：

```
继承方案：RedCircle、BlueCircle、RedSquare、BlueSquare……
          形状 × 颜色 = 爆炸

桥接方案：Shape → 持有 Color，各自独立派生
          形状 N + 颜色 M = N + M 个类
```

### 桥接模式

```java
// 实现层接口：颜色
interface Color {
    void applyColor();
}

// 具体实现：红色
class Red implements Color {
    @Override
    public void applyColor() {
        System.out.println("红色");
    }
}

// 具体实现：蓝色
class Blue implements Color {
    @Override
    public void applyColor() {
        System.out.println("蓝色");
    }
}

// 抽象层：形状（持有 Color 引用）
abstract class Shape {
    protected Color color;  // 桥接 —— 组合而非继承

    protected Shape(Color color) {
        this.color = color;
    }

    abstract void draw();
}

// 扩展抽象：圆形
class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }

    @Override
    void draw() {
        System.out.print("画圆形，颜色：");
        color.applyColor();
    }
}

// 扩展抽象：正方形
class Square extends Shape {
    public Square(Color color) {
        super(color);
    }

    @Override
    void draw() {
        System.out.print("画正方形，颜色：");
        color.applyColor();
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        Shape redCircle = new Circle(new Red());
        Shape blueSquare = new Square(new Blue());

        redCircle.draw();   // 画圆形，颜色：红色
        blueSquare.draw();  // 画正方形，颜色：蓝色

        // 运行时切换实现
        redCircle.color = new Blue();
        redCircle.draw();   // 画圆形，颜色：蓝色
    }
}
```

### 经典应用

- **JDBC 驱动**：`DriverManager`（抽象）与各数据库驱动（实现）通过桥接模式协作
- **Java AWT**：`Peer` 架构将 UI 组件与具体平台（Windows/Mac/Linux）分离
- **Logger 框架**：日志门面 + 不同实现（Logback、Log4j2）

### 与适配器模式的区别

| 模式 | 目的 | 时机 |
| :--- | :--- | :--- |
| **桥接模式** | 分离抽象与实现，使两者独立变化 | 设计阶段，预先规划 |
| **适配器模式** | 让不兼容的接口协同工作 | 事后补救，已有代码不适配 |
