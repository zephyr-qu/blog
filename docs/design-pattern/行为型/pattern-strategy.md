---
title: 设计模式| 策略模式
date: 2026-6-17
order: 6
---

# 策略模式 <Badge text="高频" type="danger" />

策略模式（Strategy Pattern）定义一系列算法，将每个算法封装起来，并使它们可以互换。它让算法独立于使用它的客户端而变化，客户端通过切换策略对象来改变行为，无需修改自身代码。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 消除大量条件分支语句（if-else / switch） | 客户端必须了解不同策略的区别，选择合适的策略 |
| 算法可以独立复用和测试，提高代码质量 | 策略类数量增多，增加维护成本 |
| 符合开闭原则，新增策略无需修改现有代码 | 策略之间如果存在重叠逻辑，提取公共部分需要额外设计 |
| 支持运行时动态切换行为，灵活性高 | 函数式编程中可用 lambda 简化策略定义，Java 中略显冗余 |

**适用场景**

- 一个系统需要在多种算法或行为中选择一种
- 需要避免大量条件分支判断
- 算法的实现细节对客户端透明
- 算法需要独立变化且可互相替换
- 同一个行为有多种实现方式，且可能在未来扩展

### 策略模式 vs 状态模式

| 模式 | 意图 | 状态管理 |
| :--- | :--- | :--- |
| **策略模式** | 封装可互换的算法，由客户端决定使用哪个 | 策略之间互不知晓，各自独立 |
| **状态模式** | 状态改变导致行为改变，状态间可自动转换 | 状态知道其他状态的存在，可触发状态转换 |

### 策略模式

```java
// 策略接口：支付方式
interface PaymentStrategy {
    void pay(double amount);
}

// 具体策略：支付宝
class AlipayStrategy implements PaymentStrategy {
    private String account;

    public AlipayStrategy(String account) {
        this.account = account;
    }

    @Override
    public void pay(double amount) {
        System.out.println("支付宝账户 " + account + " 支付 ¥" + amount);
    }
}

// 具体策略：微信支付
class WechatPayStrategy implements PaymentStrategy {
    private String openId;

    public WechatPayStrategy(String openId) {
        this.openId = openId;
    }

    @Override
    public void pay(double amount) {
        System.out.println("微信支付用户 " + openId + " 支付 ¥" + amount);
    }
}

// 具体策略：银行卡支付
class CardPayStrategy implements PaymentStrategy {
    private String cardNumber;

    public CardPayStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        System.out.println("银行卡 " + cardNumber + " 支付 ¥" + amount);
    }
}

// 上下文：订单
class Order {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(double amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("请先选择支付方式");
        }
        paymentStrategy.pay(amount);
    }
}

// 使用示例
public class StrategyDemo {
    public static void main(String[] args) {
        Order order = new Order();

        order.setPaymentStrategy(new AlipayStrategy("alice@example.com"));
        order.checkout(99.0);

        order.setPaymentStrategy(new WechatPayStrategy("wx_openid_123"));
        order.checkout(199.0);

        order.setPaymentStrategy(new CardPayStrategy("6222****1234"));
        order.checkout(299.0);
    }
}
```

### 经典应用

- **Java Comparator**：`Comparator<T>` 接口是策略模式的典型应用，不同的比较策略可互换使用
- **JDK 线程池拒绝策略**：`ThreadPoolExecutor` 的 `RejectedExecutionHandler` 四种拒绝策略
- **Spring ResourceLoader**：根据资源路径前缀（classpath:/file:/http://）选择不同的资源加载策略
- **排序算法切换**：不同数据规模选择不同排序算法（小数据插入排序，大数据归并排序）
