---
title: 设计模式| 装饰器模式
date: 2026-6-17
order: 4
---

# 装饰器模式 <Badge text="高频" type="danger" />

装饰器模式（Decorator Pattern）允许向一个现有对象动态添加新的功能，同时不改变其结构。它通过将每个功能封装在独立的装饰器类中，并让这些装饰器包装原始对象，实现在运行时灵活组合行为。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 比继承更灵活，无需创建大量子类即可扩展功能 | 多层装饰会增加系统复杂度，使代码难以调试 |
| 符合开闭原则，新增装饰器无需修改现有代码 | 装饰器链中某一层出错可能导致难以追踪的问题 |
| 支持运行时动态组合多种行为 | 可能出现大量小类，增加维护成本 |
| 可以在装饰前后添加额外行为，实现 AOP 思想 | 客户端需要明确创建装饰链，使用稍显繁琐 |

**适用场景**

- 需要动态、透明地给单个对象添加职责，而不影响其他对象
- 需要给现有类添加功能但无法通过继承实现（如 final 类）
- 需要可撤销的附加功能
- 需要大量独立扩展的组合，用继承会导致类爆炸

### 装饰器模式 vs 代理模式

| 模式 | 意图 | 控制权 |
| :--- | :--- | :--- |
| **装饰器模式** | 动态添加职责，增强功能 | 客户端直接使用装饰后的对象 |
| **代理模式** | 控制访问，延迟加载，权限校验 | 代理控制客户端对目标对象的访问 |

### 装饰器模式

```java
// 抽象组件：饮料
interface Beverage {
    String getDescription();
    double cost();
}

// 具体组件：浓缩咖啡
class Espresso implements Beverage {
    @Override
    public String getDescription() {
        return "浓缩咖啡";
    }

    @Override
    public double cost() {
        return 30.0;
    }
}

// 具体组件：美式咖啡
class Americano implements Beverage {
    @Override
    public String getDescription() {
        return "美式咖啡";
    }

    @Override
    public double cost() {
        return 25.0;
    }
}

// 抽象装饰器
abstract class CondimentDecorator implements Beverage {
    protected Beverage beverage;

    public CondimentDecorator(Beverage beverage) {
        this.beverage = beverage;
    }
}

// 具体装饰器：牛奶
class Milk extends CondimentDecorator {
    public Milk(Beverage beverage) {
        super(beverage);
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + " + 牛奶";
    }

    @Override
    public double cost() {
        return beverage.cost() + 5.0;
    }
}

// 具体装饰器：摩卡
class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        super(beverage);
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + " + 摩卡";
    }

    @Override
    public double cost() {
        return beverage.cost() + 8.0;
    }
}

// 使用示例
public class DecoratorDemo {
    public static void main(String[] args) {
        Beverage espresso = new Espresso();
        System.out.println(espresso.getDescription() + " : ¥" + espresso.cost());

        Beverage milkEspresso = new Milk(new Espresso());
        System.out.println(milkEspresso.getDescription() + " : ¥" + milkEspresso.cost());

        Beverage mochaMilkAmericano = new Mocha(new Milk(new Americano()));
        System.out.println(mochaMilkAmericano.getDescription() + " : ¥" + mochaMilkAmericano.cost());
    }
}
```

### 经典应用

- **Java I/O 流**：`BufferedInputStream` 装饰 `FileInputStream`，`InputStreamReader` 装饰 `InputStream`
- **Servlet 过滤器**：`Filter` 链对请求/响应进行层层过滤和增强
- **Spring AOP**：切面通过代理机制为目标方法添加事务、日志等功能
- **Python 装饰器**：`@staticmethod`、`@classmethod` 等语法糖本质就是装饰器模式
