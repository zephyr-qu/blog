---
title: 设计模式| 状态模式
date: 2026-6-16
order: 10
---

# 状态模式 <Badge text="常用" type="warning" />

状态模式（State Pattern）允许对象在内部状态改变时改变它的行为，对象看起来似乎修改了它的类。它将状态相关的行为封装到独立的状态类中，避免大量条件判断。

### 优缺点

| 优点 | 缺点 |
| :--- | :--- |
| 将与特定状态相关的行为局部化，并划分到不同状态类 | 状态类增多，如果状态少或变化少则过度设计 |
| 消除庞大的条件分支（if-else / switch） | 状态流转逻辑分散在状态类中，不易全局把控 |
| 状态转换显式化，提高代码可读性和可维护性 | 每个状态类都需了解其前后驱状态，产生类间依赖 |
| 符合开闭原则，新增状态无需修改现有状态类 | |

**适用场景**

- 对象的行为依赖于其状态，且状态改变时行为需随之改变
- 操作中包含大量与状态相关的条件分支语句
- 状态转换规则复杂，且需要显式管理

### 状态模式 vs 策略模式

| 模式 | 意图 | 状态知识 |
| :--- | :--- | :--- |
| **状态模式** | 状态改变 → 行为改变，状态间可自动切换 | 状态知道其他状态的存在 |
| **策略模式** | 行为可替换，客户端指定策略 | 策略之间彼此独立，互不知晓 |

### 状态模式

```java
// 状态接口
interface State {
    void insertCoin();
    void pressButton();
    void dispense();
}

// 具体状态：无硬币
class NoCoinState implements State {
    private VendingMachine machine;

    public NoCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("投币成功");
        machine.setState(machine.getHasCoinState());  // 切换到「有硬币」状态
    }

    @Override
    public void pressButton() {
        System.out.println("请先投币");
    }

    @Override
    public void dispense() {
        System.out.println("请先投币");
    }
}

// 具体状态：有硬币
class HasCoinState implements State {
    private VendingMachine machine;

    public HasCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("已投币，无需重复投币");
    }

    @Override
    public void pressButton() {
        System.out.println("按钮已按下，准备出货");
        machine.setState(machine.getSoldState());  // 切换到「售出中」状态
    }

    @Override
    public void dispense() {
        System.out.println("请先按按钮");
    }
}

// 具体状态：售出中
class SoldState implements State {
    private VendingMachine machine;

    public SoldState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("出货中，请稍后投币");
    }

    @Override
    public void pressButton() {
        System.out.println("出货中，请稍候");
    }

    @Override
    public void dispense() {
        machine.releaseProduct();
        if (machine.getCount() > 0) {
            machine.setState(machine.getNoCoinState());  // 回到「无硬币」
        } else {
            System.out.println("商品已售罄");
            machine.setState(machine.getSoldOutState()); // 切换到「售罄」
        }
    }
}

// 具体状态：售罄
class SoldOutState implements State {
    private VendingMachine machine;

    public SoldOutState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("商品已售罄");
    }

    @Override
    public void pressButton() {
        System.out.println("商品已售罄");
    }

    @Override
    public void dispense() {
        System.out.println("商品已售罄");
    }
}

// 上下文：自动售货机
class VendingMachine {
    private State noCoinState;
    private State hasCoinState;
    private State soldState;
    private State soldOutState;

    private State currentState;
    private int count;

    public VendingMachine(int count) {
        noCoinState = new NoCoinState(this);
        hasCoinState = new HasCoinState(this);
        soldState = new SoldState(this);
        soldOutState = new SoldOutState(this);

        this.count = count;
        currentState = count > 0 ? noCoinState : soldOutState;
    }

    public void insertCoin() { currentState.insertCoin(); }
    public void pressButton() { currentState.pressButton(); }
    public void dispense() { currentState.dispense(); }

    public void setState(State state) { this.currentState = state; }
    public State getNoCoinState() { return noCoinState; }
    public State getHasCoinState() { return hasCoinState; }
    public State getSoldState() { return soldState; }
    public State getSoldOutState() { return soldOutState; }
    public int getCount() { return count; }

    public void releaseProduct() {
        if (count > 0) {
            System.out.println("出货: 一瓶可乐");
            count--;
        }
    }
}

// 使用
public class Client {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine(1);
        machine.insertCoin();   // 投币成功
        machine.pressButton();  // 按钮已按下
        machine.dispense();     // 出货: 一瓶可乐 → 商品已售罄
        machine.insertCoin();   // 商品已售罄
    }
}
```

### 经典应用

- **Java 线程状态**：NEW → RUNNABLE → BLOCKED / WAITING → TERMINATED
- **TCP 连接状态**：ESTABLISHED / CLOSE_WAIT / TIME_WAIT 等状态的行为差异
- **游戏角色状态**：站立、行走、攻击、跳跃等不同状态的行为
- **工作流引擎**：审批流程中待审批/已通过/已驳回等状态流转
