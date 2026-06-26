---
title: 设计模式| 建造者模式
date: 2026-5-15
order: 5
---

# 建造者模式 <Badge text="常用" type="warning" />

建造者模式也称为生成器模式（Builder Pattern），将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。

### 优缺点



| 优点                                   | 缺点                                                       |
| :------------------------------------- | :--------------------------------------------------------- |
| 创建与使用分离，客户端无需知道组装细节 | 产生多余的 Builder 对象，增加内存开销                      |
| 扩展性好，新增产品只需添加新的建造者类 | 产品内部发生变化时，所有相关建造者都需要修改，维护成本较高 |
| 建造者间相互独立，一定程度解耦         |                                                            |



**适用场景**

- 对象参数多，且有大量可选参数
- 创建步骤固定，但具体实现多样
- 构建过程与产品表示需要分离

### 经典建造者

```Java
// 产品：电脑
public class Computer {
    private String cpu;       // 必选
    private String ram;       // 必选
    private String storage;   // 可选
    private String gpu;       // 可选
    private String cooler;    // 可选

    // 私有构造，只有建造者能调用
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
        this.cooler = builder.cooler;
    }

    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", ram='" + ram + '\'' +
                ", storage='" + storage + '\'' +
                ", gpu='" + gpu + '\'' +
                ", cooler='" + cooler + '\'' +
                '}';
    }

    // 静态内部类：建造者
    public static class Builder {
        private String cpu;
        private String ram;
        private String storage = "512GB SSD";   // 默认值
        private String gpu = "集成显卡";         // 默认值
        private String cooler = "风冷";          // 默认值

        // 必选参数通过构造传入
        public Builder(String cpu, String ram) {
            this.cpu = cpu;
            this.ram = ram;
        }

        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder setGpu(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public Builder setCooler(String cooler) {
            this.cooler = cooler;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Computer gamingPC = new Computer.Builder("Intel i7", "16GB")
                .setStorage("1TB NVMe SSD")
                .setGpu("RTX 4070")
                .setCooler("水冷")
                .build();

        System.out.println(gamingPC);
    }
}
```



### 链式建造者

> 写法更简洁，**不需要手动写内部 Builder 类**，直接用 Lombok 注解或手动实现类似风格。

```Java
// 产品：电脑（手动链式）
public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    private String cooler;

    private Computer() {}

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Computer computer = new Computer();

        public Builder cpu(String cpu) {
            computer.cpu = cpu;
            return this;
        }

        public Builder ram(String ram) {
            computer.ram = ram;
            return this;
        }

        public Builder storage(String storage) {
            computer.storage = storage;
            return this;
        }

        public Builder gpu(String gpu) {
            computer.gpu = gpu;
            return this;
        }

        public Builder cooler(String cooler) {
            computer.cooler = cooler;
            return this;
        }

        public Computer build() {
            return computer;
        }
    }

    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", ram='" + ram + '\'' +
                ", storage='" + storage + '\'' +
                ", gpu='" + gpu + '\'' +
                ", cooler='" + cooler + '\'' +
                '}';
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Computer gamingPC = Computer.builder()
                .cpu("Intel i7")
                .ram("16GB")
                .storage("1TB NVMe SSD")
                .gpu("RTX 4070")
                .cooler("水冷")
                .build();

        System.out.println(gamingPC);
    }
}
```



### 写法对比

| 对比项          | 常规写法（静态内部类） | 链式写法                   |
| :-------------- | :--------------------- | :------------------------- |
| 必选参数处理    | 通过构造方法传入       | 通过单独方法设置，无法强制 |
| 参数默认值      | 在 Builder 中设置      | 在 Builder 或产品类中设置  |
| 代码量          | 较多                   | 较少                       |
| 可读性          | 清晰                   | 更直观                     |
| 是否需导演类    | 不需要                 | 不需要                     |
| 是否支持 Lombok | 可手动实现             | Lombok `@Builder` 一键生成 |

