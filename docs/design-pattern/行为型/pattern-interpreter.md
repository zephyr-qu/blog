---
title: 设计模式| 解释器模式
date: 2026-6-16
order: 13
---

# 解释器模式 <Badge text="低频" type="info" />

解释器模式（Interpreter Pattern）给定一个语言，定义它的文法的一种表示，并定义一个解释器，该解释器使用该表示来解释语言中的句子。常用于实现简单的领域特定语言（DSL）。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 易于扩展文法 —— 新增表达式类即新增语法规则 | 复杂文法导致类爆炸，维护困难 |
| 实现文法较为容易，每个表达式节点职责单一 | 对于复杂文法，解释器效率较低 |
| 可方便地在语法树上增加操作 | 不适合语法规则复杂的语言 |

**适用场景**

- 需要解释执行一种简单语言，语法规则不复杂
- 文法固定，但解释操作可能变化
- 重复出现的问题可以用简单语言表达
- 编译器、计算器、正则表达式引擎等场景

### 解释器模式

```java
import java.util.Map;

// 抽象表达式
interface Expression {
    int interpret(Map<String, Integer> context);
}

// 终结符表达式：变量
class Variable implements Expression {
    private final String name;

    public Variable(String name) {
        this.name = name;
    }

    @Override
    public int interpret(Map<String, Integer> context) {
        Integer value = context.get(name);
        if (value == null) {
            throw new RuntimeException("未定义变量: " + name);
        }
        return value;
    }
}

// 非终结符表达式：加法
class Add implements Expression {
    private final Expression left, right;

    public Add(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) + right.interpret(context);
    }
}

// 非终结符表达式：减法
class Subtract implements Expression {
    private final Expression left, right;

    public Subtract(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) - right.interpret(context);
    }
}

// 数字常量（终结符）
class Number implements Expression {
    private final int value;

    public Number(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Map<String, Integer> context) {
        return value;
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        // 构建表达式: (a + b) - (c - 10)
        Expression expr = new Subtract(
            new Add(new Variable("a"), new Variable("b")),
            new Subtract(new Variable("c"), new Number(10))
        );

        Map<String, Integer> ctx = Map.of("a", 5, "b", 3, "c", 8);
        int result = expr.interpret(ctx);
        System.out.println("结果: " + result);  // (5+3) - (8-10) = 10
    }
}
```

### 语法树示例

```
        Subtract
        /      \
     Add       Subtract
    /   \      /    \
   a     b    c      10
```

### 与策略模式的区别

| 模式 | 关注点 |
| :--- | :--- |
| **解释器模式** | 定义文法规则并解释执行，每个规则是一个类 |
| **策略模式** | 定义算法族并使其可互换，每个策略是一个算法 |

### 经典应用

- **正则表达式引擎**：将正则字符串解析为表达式树
- **Spring SpEL**：Spring 表达式语言解析执行
- **Lombok**：对注解中的表达式进行解析
- **SQL 解析器**：将 SQL 语句解析为语法树执行
