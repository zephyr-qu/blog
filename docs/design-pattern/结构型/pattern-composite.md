---
title: 设计模式| 组合模式
date: 2026-6-17
order: 7
---

# 组合模式 <Badge text="常用" type="warning" />

组合模式（Composite Pattern）将对象组合成树形结构以表示"部分-整体"的层次结构。它使客户端对单个对象和组合对象的使用具有一致性，即客户端可以像处理单个对象一样处理组合对象。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 客户端可以一致地处理复杂树结构与单个对象，无需区分 | 设计过于一般化，对类型的限制变得困难 |
| 新增组件类型无需修改现有代码，符合开闭原则 | 可能使系统设计变得过于抽象，增加理解难度 |
| 天然支持递归组合，能灵活构建复杂结构 | 如果树结构层次过深，递归调用可能带来性能问题 |
| 简化客户端代码，无需关心操作对象是叶子还是容器 | |

**适用场景**

- 需要表示对象的整体-部分层次结构
- 希望客户端忽略组合对象与单个对象的差异，统一处理
- 树形结构的数据模型，如文件系统、组织架构、菜单系统
- 需要对层次结构进行递归操作

### 组合模式 vs 装饰器模式

| 模式 | 意图 | 结构关系 |
| :--- | :--- | :--- |
| **组合模式** | 树形结构，部分-整体一致性 | 容器包含子节点（聚合） |
| **装饰器模式** | 动态添加职责，功能扩展 | 装饰器包裹被装饰者（叠加） |

### 组合模式

```java
import java.util.ArrayList;
import java.util.List;

// 组件接口：统一的叶子与容器接口
abstract class FileSystemNode {
    protected String name;

    public FileSystemNode(String name) {
        this.name = name;
    }

    public abstract void display(int depth);
    public abstract long getSize();
}

// 叶子节点：文件
class File extends FileSystemNode {
    private long size;

    public File(String name, long size) {
        super(name);
        this.size = size;
    }

    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth) + "- " + name + " (" + size + " bytes)");
    }

    @Override
    public long getSize() {
        return size;
    }
}

// 容器节点：文件夹
class Directory extends FileSystemNode {
    private List<FileSystemNode> children = new ArrayList<>();

    public Directory(String name) {
        super(name);
    }

    public void add(FileSystemNode node) {
        children.add(node);
    }

    public void remove(FileSystemNode node) {
        children.remove(node);
    }

    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth) + "+ " + name + "/");
        for (FileSystemNode child : children) {
            child.display(depth + 1);
        }
    }

    @Override
    public long getSize() {
        long total = 0;
        for (FileSystemNode child : children) {
            total += child.getSize();
        }
        return total;
    }
}

// 使用示例
public class CompositeDemo {
    public static void main(String[] args) {
        Directory root = new Directory("root");

        Directory docs = new Directory("docs");
        docs.add(new File("readme.md", 100));
        docs.add(new File("guide.md", 200));

        Directory src = new Directory("src");
        src.add(new File("main.java", 500));
        src.add(new File("utils.java", 300));

        root.add(docs);
        root.add(src);

        root.display(0);
        System.out.println("Total size: " + root.getSize() + " bytes");
    }
}
```

### 经典应用

- **文件系统**：文件和文件夹统一为节点，文件夹可包含文件或子文件夹
- **GUI 容器**：Swing 的 `Container` 和 `Component`，容器可包含组件，两者都支持 `paint()` 统一绘制
- **XML/HTML DOM**：元素节点可以包含子元素或文本节点，统一进行遍历和渲染
- **菜单系统**：菜单项（叶子）和菜单（容器）统一为菜单组件，支持嵌套菜单
