---
title: 设计模式| 模板方法模式
date: 2026-6-17
order: 8
---

# 模板方法模式 <Badge text="高频" type="danger" />

模板方法模式（Template Method Pattern）在一个方法中定义一个算法的骨架，将一些步骤延迟到子类中实现。它使子类可以在不改变算法结构的情况下重新定义算法的某些特定步骤。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 封装不变部分，扩展可变部分，符合开闭原则 | 算法骨架本身难以修改，如果骨架需要变化则需修改基类 |
| 提取公共代码到父类，提高复用性 | 子类实现可能限制父类模板的灵活性，过度使用会导致继承体系僵化 |
| 子类只需关注自身逻辑，降低复杂度 | 类数量增加，每个实现都需要一个子类 |
| 通过钩子方法提供扩展点，控制子类行为 | |

**适用场景**

- 多个子类有共同的操作步骤，但某些步骤的具体实现不同
- 需要控制子类扩展的边界（通过钩子方法约束子类行为）
- 希望在不修改算法结构的前提下复用代码
- 框架设计中定义扩展点，让用户实现自定义逻辑

### 模板方法模式 vs 策略模式

| 模式 | 粒度 | 控制方式 |
| :--- | :--- | :--- |
| **模板方法模式** | 算法级，整体骨架由父类控制 | 子类通过继承重写部分步骤 |
| **策略模式** | 算法级，完整算法可互换 | 客户端通过组合选择完整策略 |

### 模板方法模式

```java
// 抽象类：饮料制作模板
abstract class BeverageMaker {

    // 模板方法——定义算法骨架
    public final void makeBeverage() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) {
            addCondiments();
        }
    }

    private void boilWater() {
        System.out.println("煮沸水");
    }

    private void pourInCup() {
        System.out.println("倒入杯中");
    }

    // 抽象步骤——由子类实现
    protected abstract void brew();
    protected abstract void addCondiments();

    // 钩子方法——子类可覆写以控制算法流程
    protected boolean customerWantsCondiments() {
        return true;
    }
}

// 具体子类：咖啡
class CoffeeMaker extends BeverageMaker {
    @Override
    protected void brew() {
        System.out.println("冲泡咖啡粉");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入糖和牛奶");
    }
}

// 具体子类：茶
class TeaMaker extends BeverageMaker {
    @Override
    protected void brew() {
        System.out.println("浸泡茶叶");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入柠檬");
    }

    @Override
    protected boolean customerWantsCondiments() {
        // 假设客户不要调料
        return false;
    }
}

// 使用示例
public class TemplateMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== 制作咖啡 ===");
        BeverageMaker coffee = new CoffeeMaker();
        coffee.makeBeverage();

        System.out.println("\n=== 制作茶 ===");
        BeverageMaker tea = new TeaMaker();
        tea.makeBeverage();
    }
}
```

### 钩子方法

模板方法模式中的**钩子方法**是一种可选扩展点，子类可以选择覆写或忽略：

- **默认行为**：钩子在父类中提供默认实现（通常是空方法或返回固定值）
- **控制流程**：子类覆写钩子来影响模板方法的执行流程
- **通知回调**：子类覆写钩子以在特定步骤执行前后附加行为

### 经典应用

- **Java Servlet**：`HttpServlet` 的 `doGet()` / `doPost()` 是典型的模板方法，由容器调用 `service()` 模板方法
- **Spring JdbcTemplate**：`JdbcTemplate` 定义数据库操作骨架，回调接口处理结果集转换
- **JUnit**：测试执行框架定义 setUp() → testXXX() → tearDown() 的执行顺序模板
- **InputStream/Reader**：`InputStream` 的 `read()` 方法定义读取骨架，子类实现具体读取方式
