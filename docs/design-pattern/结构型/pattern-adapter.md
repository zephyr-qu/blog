---
title: 设计模式| 适配器模式
date: 2025-1-1
order: 5
---

# 适配器模式 <Badge text="高频" type="danger" />

适配器模式（Adapter Pattern）用于将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而无法一起工作的类能够协同工作。

### 优缺点

| 优点                                     | 缺点                           |
| :--------------------------------------- | :----------------------------- |
| 解决接口不兼容问题，提高代码复用         | 增加系统复杂度                 |
| 符合开闭原则，不修改原有代码             | 过多适配器降低可读性和可维护性 |
| 客户端与适配者解耦                       | 对象适配器有额外方法调用开销   |
| 对象适配器灵活性高，可适配适配者及其子类 | （此栏为空）                   |

**适用场景**

- 接口不兼容，现有类无法直接使用，需适配对接时
- 想复用现有类但不愿或不能修改其源码时
- 多个类功能相似但接口各异，需统一调用方式时
- 外部组件接口与系统不一致时



### 两种实现方式

| 类型           | 实现方式                      | 优点                               | 适用场景                                   |
| :------------- | :---------------------------- | :--------------------------------- | :----------------------------------------- |
| **类适配器**   | 继承适配者 + 实现目标接口     | 可重写适配者行为                   | 单继承语言（Java不支持多继承，用接口实现） |
| **对象适配器** | 持有适配者引用 + 实现目标接口 | 更灵活（可适配多个适配者及其子类） | 更常用                                     |

### 类适配器

```Java
// 目标接口：手机需要的5V电压
interface Phone {
    void charge5V();
}

// 适配者：家里220V插座
class Power220V {
    void charge220V() {
        System.out.println("220V交流电输出");
    }
}

// 类适配器：充电头（继承220V插座 + 实现手机接口）
class ChargerAdapter extends Power220V implements Phone {
    @Override
    public void charge5V() {
        charge220V();        // 接收220V
        System.out.println("→ 转换成5V直流电 → 手机充电中");
    }
}

// 使用
public class Demo {
    public static void main(String[] args) {
        Phone phone = new ChargerAdapter();
        phone.charge5V();  // 直接用5V接口充电
    }
}
```



### 对象适配器

```Java
// 目标接口：手机需要的5V电压
interface Phone {
    void charge5V();
}

// 适配者：家里220V插座
class Power220V {
    void charge220V() {
        System.out.println("220V交流电输出");
    }
}

// 对象适配器：充电头（持有适配者对象，而非继承）
class ChargerAdapter implements Phone {
    private Power220V power;  // 通过组合持有适配者
    
    public ChargerAdapter(Power220V power) {
        this.power = power;
    }
    
    @Override
    public void charge5V() {
        power.charge220V();    // 调用适配者的方法
        System.out.println("→ 转换成5V直流电 → 手机充电中");
    }
}

// 使用
public class Demo {
    public static void main(String[] args) {
        Power220V socket = new Power220V();
        Phone phone = new ChargerAdapter(socket);  // 把插座塞进充电头
        phone.charge5V();
    }
}
```

### 
