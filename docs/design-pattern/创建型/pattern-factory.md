---
title: 设计模式| 工厂模式
date: 2026-2-1
order: 3
---

# 工厂模式 <Badge text="高频" type="danger" />

工厂方法模式 (Factory Method Pattern) 定义一个创建对象的接口，但让子类决定实例化哪个类。工厂方法使类的实例化延迟到子类。

### 优缺点

| 优点                                       | 缺点                                     |
| :----------------------------------------- | :--------------------------------------- |
| 避免创建者和具体产品之间的紧密耦合         | 需要引入许多新的子类，可能增加代码复杂度 |
| 单一职责原则：产品创建代码集中在单一位置   | 在抽象层中引入了依赖性                   |
| 开闭原则：引入新产品类型无需修改客户端代码 |                                          |

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
// ================= 1. 抽象产品 =================
// 定义所有具体产品必须实现的接口
// 客户端只依赖这个接口，不关心具体是圆还是方
interface Shape {
    void draw();
}

// ================= 2. 具体产品 =================
// 这些是最终被创建出来的真实对象
// 每一个类都实现了 Shape 接口

class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制圆形");
    }
}

class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制矩形");
    }
}

class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制三角形");
    }
}

// ================= 3. 抽象工厂 =================
// 定义创建产品的标准方法
// 注意：这里每个具体工厂只负责生产“一种”形状
interface ShapeFactory {
    Shape createShape();
}

// ================= 4. 具体工厂 =================
// 每一个具体工厂对应一个具体产品
// CircleFactory 专门负责生产 Circle，RectangleFactory 专门负责生产 Rectangle

class CircleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Circle(); // 这里决定了具体返回什么对象
    }
}

class RectangleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Rectangle();
    }
}

class TriangleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Triangle();
    }
}

// ================= 5. 客户端测试 =================
public class FactoryMethodDemo {
    public static void main(String[] args) {
        // 1. 创建具体的工厂实例
        // 想要圆形，就实例化圆形工厂
        ShapeFactory circleFactory = new CircleFactory();
        
        // 想要矩形，就实例化矩形工厂
        ShapeFactory rectFactory = new RectangleFactory();
        
        // 想要三角形，就实例化三角形工厂
        ShapeFactory triFactory = new TriangleFactory();

        // 2. 通过工厂创建产品
        // 客户端调用的是统一的 createShape() 方法，但得到的是不同的具体对象
        Shape circle = circleFactory.createShape(); // 内部返回 new Circle()
        Shape rect = rectFactory.createShape();     // 内部返回 new Rectangle()
        Shape tri = triFactory.createShape();       // 内部返回 new Triangle()

        // 3. 使用产品
        // 因为都实现了 Shape 接口，所以调用方式完全一致
        circle.draw(); // 输出: 绘制圆形
        rect.draw();   // 输出: 绘制矩形
        tri.draw();    // 输出: 绘制三角形
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
// ================= 1. 抽象产品 =================
// 所有具体图形必须实现的接口
// 客户端只面向这个接口编程，不关心具体实现
interface Shape {
    void draw();
}

// ================= 2. 具体产品 =================
// 具体的业务逻辑实现类

class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制圆形");
    }
}

class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制矩形");
    }
}

class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("绘制三角形");
    }
}

// ================= 3. 简单工厂类 =================
// 核心特点：
// 1. 只有一个工厂类
// 2. 使用 static 静态方法，无需实例化工厂对象即可调用
// 3. 内部通过 if/switch 判断来决定创建哪个对象
class ShapeFactory {
    
    /**
     * 根据传入的类型字符串，返回对应的形状对象
     * @param type 形状类型标识 (如 "circle", "rectangle")
     * @return 具体的 Shape 实现类对象
     */
    public static Shape createShape(String type) {
        // 统一转为小写，防止大小写敏感问题
        switch (type.toLowerCase()) {
            case "circle":
                return new Circle();      // 创建圆形
            case "rectangle":
                return new Rectangle();   // 创建矩形
            case "triangle":
                return new Triangle();    // 创建三角形
            default:
                // 如果传入未知类型，抛出异常，避免返回 null 导致空指针
                throw new IllegalArgumentException("未知图形类型: " + type);
        }
    }
}

// ================= 4. 客户端测试 =================
public class SimpleFactoryDemo {
    public static void main(String[] args) {
        // 客户端不需要知道 new Circle() 或 new Rectangle()
        // 只需要告诉工厂：“我要一个 circle”，工厂就会给我
        
        Shape circle = ShapeFactory.createShape("circle");
        Shape rect = ShapeFactory.createShape("rectangle");
        Shape tri = ShapeFactory.createShape("triangle");

        // 统一调用 draw 方法，多态生效
        circle.draw(); // 输出: 绘制圆形
        rect.draw();   // 输出: 绘制矩形
        tri.draw();    // 输出: 绘制三角形
    }
}
```



