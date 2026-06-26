---
title: 设计模式| 备忘录模式
date: 2026-6-16
order: 14
---

# 备忘录模式 <Badge text="低频" type="info" />

备忘录模式（Memento Pattern）在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便之后将对象恢复到原先保存的状态。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 提供状态恢复机制，实现撤销/重做功能 | 频繁保存状态可能消耗大量内存 |
| 保持封装边界，外部无法直接访问原发器内部状态 | 备忘录类需与原发器保持相同生命周期，管理复杂 |
| 简化原发器职责，状态管理委托给负责人 | 如果状态数据量大，备份和恢复有性能开销 |

**适用场景**

- 需要实现撤销（Undo）功能
- 需要保存对象在某一个时刻的状态快照
- 不希望直接暴露对象内部状态的获取方法

### 备忘录模式

```java
import java.util.Stack;

// 备忘录 —— 不透明，只由原发器读写
class Memento {
    private final String state;

    public Memento(String state) {
        this.state = state;
    }

    // 包级私有，仅原发器可访问
    String getState() {
        return state;
    }
}

// 原发器
class Editor {
    private String content = "";

    public void write(String text) {
        content += text;
    }

    public String getContent() {
        return content;
    }

    // 创建备忘录
    public Memento save() {
        System.out.println("保存状态: " + content);
        return new Memento(content);
    }

    // 从备忘录恢复
    public void restore(Memento memento) {
        content = memento.getState();
        System.out.println("恢复状态: " + content);
    }
}

// 负责人 —— 管理备忘录历史
class History {
    private final Stack<Memento> undoStack = new Stack<>();

    public void push(Memento memento) {
        undoStack.push(memento);
    }

    public Memento pop() {
        return undoStack.isEmpty() ? null : undoStack.pop();
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        Editor editor = new Editor();
        History history = new History();

        editor.write("Hello, ");
        history.push(editor.save());    // 保存: Hello,

        editor.write("World!");
        history.push(editor.save());    // 保存: Hello, World!

        editor.write(" 结束");
        System.out.println("当前: " + editor.getContent()); // Hello, World! 结束

        editor.restore(history.pop());  // 撤销 → Hello, World!
        editor.restore(history.pop());  // 撤销 → Hello,
    }
}
```

### 三种角色

| 角色 | 职责 | 示例 |
| :--- | :--- | :--- |
| **原发器（Originator）** | 创建备忘录 & 从备忘录恢复 | `Editor` |
| **备忘录（Memento）** | 存储原发器内部状态，对外不透明 | `Memento` |
| **负责人（Caretaker）** | 管理备忘录生命周期（保存/获取） | `History` |

### 宽接口 vs 窄接口

| 访问权限 | 含义 | 实现方式 |
| :--- | :--- | :--- |
| **窄接口** | 外部只能看到备忘录元信息（如名称、时间戳） | 对外暴露无状态方法的接口 |
| **宽接口** | 原发器可以读写备忘录全部状态 | Java 中通过包级访问 / 内部类实现 |

### 经典应用

- **IDE 撤销 / 重做**：每次编辑操作保存一个快照
- **游戏存档**：保存角色状态，读档恢复
- **数据库事务回滚**：保存 undo log
- **Spring WebFlow**：保存会话状态，支持回退
