---
title: 设计模式| 工厂模式
date: 2026-2-1
order: 3
---

# 工厂模式

工厂方法模式 (Factory Method Pattern) 定义一个创建对象的接口，但让子类决定实例化哪个类。工厂方法使类的实例化延迟到子类。



### 优缺点

**优点：**

1. 避免创建者和具体产品之间的紧密耦合
2. 单一职责原则：产品创建代码集中在单一位置
3. 开闭原则：引入新产品类型无需修改客户端代码

**缺点：**

1. 需要引入许多新的子类，可能增加代码复杂度
2. 在抽象层中引入了依赖性



**适用场景**

1. 当类不知道它需要创建哪些具体对象时
2. 当类希望其子类指定它创建的对象时
3. 当需要解耦产品创建逻辑和使用逻辑时



**与抽象工厂的关系**

- 工厂方法通常作为抽象工厂的一部分实现
- 抽象工厂使用多个工厂方法创建相关产品族
- 工厂方法专注于创建单一产品



**分类**

工厂设计模式属于创造型模式。

- **简单工厂设计模式**：简单工厂并不是严格意义上的设计模式。它更多的是一种用于封装对象实例化过程的编程技术。
- **工厂方法设计模式**：定义了一个创建对象的接口，决定哪个类实例化，工厂方法允许将类的实例化延迟到子类。
- **抽象工厂设计模式**：提供一个接口，用于创建相关或依赖对象，而无需指定它们。



### 工厂模式

```Java
// 抽象产品
interface Shape {
    void draw();
}

// 具体产品
class Circle implements Shape {
    public void draw() {
        System.out.println("绘制圆形");
    }
}

class Rectangle implements Shape {
    public void draw() {
        System.out.println("绘制矩形");
    }
}

class Triangle implements Shape {
    public void draw() {
        System.out.println("绘制三角形");
    }
}

// 抽象工厂
interface ShapeFactory {
    Shape createShape();
}

// 具体工厂
class CircleFactory implements ShapeFactory {
    public Shape createShape() {
        return new Circle();
    }
}

class RectangleFactory implements ShapeFactory {
    public Shape createShape() {
        return new Rectangle();
    }
}

class TriangleFactory implements ShapeFactory {
    public Shape createShape() {
        return new Triangle();
    }
}

// 客户端测试
public class FactoryMethodDemo {
    public static void main(String[] args) {
        ShapeFactory circleFactory = new CircleFactory();
        ShapeFactory rectFactory = new RectangleFactory();
        ShapeFactory triFactory = new TriangleFactory();

        Shape circle = circleFactory.createShape();
        Shape rect = rectFactory.createShape();
        Shape tri = triFactory.createShape();

        circle.draw();
        rect.draw();
        tri.draw();
    }
}
```

 



### 简单工厂模式

简单工厂模式（Simple Factory）由一个工厂对象决定创建出哪一种类型实例。客户端只需传入工厂类的参数，无心关心创建过程。



**优点**

- 具体产品从客户端代码中抽离出来，解耦。
- 构造容易，逻辑简单。

**缺点**

- 工厂类职责过重，违背单一职责原则
- 增加新的类型时，得修改工程类得代码，违背开闭原则。
- 工厂类中集合了所有的类的实例创建逻辑，违反了高内聚的责任分配原则



```Java
// 抽象产品
interface Shape {
    void draw();
}

// 具体产品
class Circle implements Shape {
    public void draw() {
        System.out.println("绘制圆形");
    }
}

class Rectangle implements Shape {
    public void draw() {
        System.out.println("绘制矩形");
    }
}

class Triangle implements Shape {
    public void draw() {
        System.out.println("绘制三角形");
    }
}

// 简单工厂类
class ShapeFactory {
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle":
                return new Circle();
            case "rectangle":
                return new Rectangle();
            case "triangle":
                return new Triangle();
            default:
                throw new IllegalArgumentException("未知图形类型: " + type);
        }
    }
}

// 客户端测试
public class SimpleFactoryDemo {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.createShape("circle");
        Shape rect = ShapeFactory.createShape("rectangle");
        Shape tri = ShapeFactory.createShape("triangle");

        circle.draw();
        rect.draw();
        tri.draw();
    }
}
```



