---
title: 设计模式| 享元模式
date: 2026-6-16
order: 9
---

# 享元模式 <Badge text="低频" type="info" />

享元模式（Flyweight Pattern）通过共享尽可能多的细粒度对象来有效支持大量细粒度对象的重用，减少内存占用。它将对象的状态分为内部状态（可共享，不变）和外部状态（不可共享，随上下文变化）。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 大幅减少内存中相似对象的数量 | 需要分离内/外部状态，增加逻辑复杂度 |
| 缓存共享对象，提升系统性能 | 以时间换空间，享元工厂查找可能增加耗时 |
| 外部状态独立存储，不影响共享 | 如果内部状态设计不合理，可能导致线程安全问题 |

**适用场景**

- 系统有大量相似对象，造成内存开销过高
- 对象的大部分状态可以外部化，剥离后对象可共享
- 需要缓存池来管理对象的场景

### 享元模式

```java
import java.util.HashMap;
import java.util.Map;

// 享元接口
interface Tree {
    void display(int x, int y);  // x, y 是外部状态（位置）
}

// 具体享元：树木类型（内部状态：名称、颜色、纹理）
class TreeType implements Tree {
    private final String name;   // 内部状态 —— 不变，可共享
    private final String color;
    private final String texture;

    public TreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    @Override
    public void display(int x, int y) {
        System.out.printf("%s（%s,%s）位于 (%d, %d)%n", name, color, texture, x, y);
    }
}

// 享元工厂
class TreeFactory {
    private static final Map<String, TreeType> pool = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "|" + color + "|" + texture;
        // 存在则返回共享对象，不存在则创建
        return pool.computeIfAbsent(key, k -> {
            System.out.println("→ 创建新树类型: " + name);
            return new TreeType(name, color, texture);
        });
    }

    public static int poolSize() {
        return pool.size();
    }
}

// 客户端：每棵树有独立位置
class Forest {
    public static void main(String[] args) {
        // 种植 10000 棵树，但只有 2 种树类型
        for (int i = 0; i < 5000; i++) {
            TreeType oak = TreeFactory.getTreeType("橡树", "绿", "粗糙");
            oak.display(i, i % 100);
        }
        for (int i = 0; i < 5000; i++) {
            TreeType pine = TreeFactory.getTreeType("松树", "深绿", "鳞片");
            pine.display(i, i % 100);
        }
        System.out.println("池中享元对象数: " + TreeFactory.poolSize()); // 2
    }
}
```

### 状态区分

| 状态类型 | 特征 | 示例 |
| :--- | :--- | :--- |
| **内部状态** | 不变、可共享、存储在享元对象内部 | 树的类型、颜色、纹理 |
| **外部状态** | 随上下文变化、由客户端维护 | 树的位置坐标 |

### 经典应用

- **String 常量池**：JVM 复用字符串字面量
- **Integer 缓存**：`Integer.valueOf(-128 ~ 127)` 返回缓存对象
- **线程池**：复用线程对象
- **Java 中的 `String#intern()`**
