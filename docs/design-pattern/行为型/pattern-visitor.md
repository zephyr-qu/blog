---
title: 设计模式| 访问者模式
date: 2026-6-16
order: 15
---

# 访问者模式 <Badge text="低频" type="info" />

访问者模式（Visitor Pattern）将数据结构和作用于结构上的操作解耦，使得可以在不改变各元素类的前提下定义作用于这些元素的新操作。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 符合开闭原则：新增操作只需新增访问者，无需修改元素类 | 增加新元素类困难：每新增一个元素，所有访问者都需修改 |
| 将相关操作集中到一个访问者中，而非分散在元素类中 | 破坏封装：访问者需了解元素内部细节才能操作 |
| 积累状态：访问者可在遍历过程中累积结果 | 元素类变更时需同步更新所有访问者 |
| 双分派：一次请求在运行时由两种类型（元素+访问者）决定 | 理解成本较高，适用场景较少 |

**适用场景**

- 对象结构中包含多种类型的对象，希望对这些对象实施不同操作
- 需要对一个对象结构中的对象进行很多不相关的操作，不想污染元素类
- 元素类层次结构稳定，不频繁新增元素类型
- 编译器抽象语法树（AST）处理

### 双分派机制

```java
// 第一次分派：element.accept(visitor) — 运行时确定元素类型
// 第二次分派：visitor.visit(element)  — 运行时确定访问者 + 元素类型
element.accept(visitor);
// 编译时看 element 声明类型，运行时看实际类型 → 找到对应的 accept
// visitor.visit(this) → 编译时根据 this 类型确定 visit 重载
```

### 访问者模式

```java
import java.util.ArrayList;
import java.util.List;

// 访问者接口
interface Visitor {
    void visit(File file);
    void visit(Directory directory);
}

// 具体访问者：打印文件树
class PrintVisitor implements Visitor {
    private int indent = 0;

    private void printIndent() {
        for (int i = 0; i < indent; i++) System.out.print("  ");
    }

    @Override
    public void visit(File file) {
        printIndent();
        System.out.println("- " + file.getName() + " (" + file.getSize() + "KB)");
    }

    @Override
    public void visit(Directory dir) {
        printIndent();
        System.out.println("+ " + dir.getName() + "/");
        indent++;
        for (Entry child : dir.getChildren()) {
            child.accept(this);
        }
        indent--;
    }
}

// 具体访问者：计算总大小
class SizeCalculator implements Visitor {
    private int totalSize = 0;

    @Override
    public void visit(File file) {
        totalSize += file.getSize();
    }

    @Override
    public void visit(Directory dir) {
        for (Entry child : dir.getChildren()) {
            child.accept(this);
        }
    }

    public int getTotalSize() { return totalSize; }
}

// 元素接口
interface Entry {
    String getName();
    void accept(Visitor visitor);
}

// 文件元素
class File implements Entry {
    private String name;
    private int size;

    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }

    public int getSize() { return size; }

    @Override
    public String getName() { return name; }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);  // 双分派 — 传入 this，触发 visit(File)
    }
}

// 目录元素
class Directory implements Entry {
    private String name;
    private List<Entry> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(Entry entry) {
        children.add(entry);
    }

    public List<Entry> getChildren() { return children; }

    @Override
    public String getName() { return name; }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);  // 双分派 — 传入 this，触发 visit(Directory)
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        Directory root = new Directory("src");
        Directory utils = new Directory("utils");
        utils.add(new File("StringUtils.java", 5));
        utils.add(new File("DateUtils.java", 3));
        root.add(utils);
        root.add(new File("Main.java", 2));

        // 打印文件树
        System.out.println("文件结构:");
        root.accept(new PrintVisitor());

        // 计算总大小
        SizeCalculator calc = new SizeCalculator();
        root.accept(calc);
        System.out.println("总大小: " + calc.getTotalSize() + "KB");
    }
}
```

### 增加新操作 vs 增加新元素

| 操作 | 影响 | 适合访问者模式吗？ |
| :--- | :--- | :--- |
| 新增操作（如搜索功能） | 只需新增一个 Visitor 类 | ✅ 非常适合 |
| 新增元素（如 Symlink） | 需修改所有现有 Visitor | ❌ 不适合 |

### 经典应用

- **Java 编译器 javac**：`Visitor` 遍历 AST，不同阶段用不同 Visitor
- **Spring BeanDefinitionVisitor**：解析 XML 中的 Bean 定义
- **Lombok**：AST 访问者模式实现注解处理
- **文件系统遍历**：同一组文件/目录，不同 Visitor 做不同操作（搜索、压缩、统计）
- **ASM / ByteBuddy**：字节码操作框架中 Visitor 访问类文件结构
