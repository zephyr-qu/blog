---
title: 胡说| Git 简明使用
date: 2025-3-2
categories: 
  - 编程知识
order: 3
---



# Git 的简明使用

::: tip 前言 

好久不见，今天带来了 Git 的简明使用😀

:::



## 简介

Git是一种分布式版本控制系统，支持本地和远程协作开发，适用于代码和文档管理。其核心优势包括：

- 分布式架构（无需网络即可工作）
- 高效的分支管理
- 完整的历史记录追踪



## 初始化配置

### 账户配置

```bash
# 配置全局账户（所有 Git 仓库有效）
git config --global user.name "Your Name"
git config --global user.email "Your Email"

# 配置局部账户（当前 Git 仓库有效）
git config --local user.name 'Your Name'
git config --local user.email 'Your Email'

# 查看全局配置
git config --global --list

# 查看局部配置
git config --local --list
```

::: warning 注意

**Git  大小写问题**

Git 默认不区分大小写，在某些环境下可能不方便，要启动大小写区分

```bash
# 查看大小写配置
git config --get core.ignorecase

# 关闭 忽略大小写的配置
git config core.ignorecase false
```

:::



### 远程连接 

> 不连接咋个玩嘛🤪

生成 SSH Key 用于与GitHub等远程仓库安全通信：

```bash
ssh-keygen -t rsa -C "Your Email"
```

这行命令会生成 `id_rsa`  和  `id_rsa.pub` 文件，一般会在 `C:\Users\你的用户名\.ssh` 目录下，然后将生成的 `id_rsa.pub` 公钥内容添加到GitHub账户的SSH Key设置中。



::: info 扩展

SSH密钥是一种用于计算机网络中安全通信的方法。它使用一对密钥：一个公钥和一个私钥。公钥可以安全地存储在GitHub等服务器上，而私钥则保留在用户的本地计算机上。

> 不仅在这里有用，而且还可以使用SSH连接远程服务器哦😮

:::



## 基础操作 <Badge text="基础" />

> 这是最简单的，最常用的

```bash
# 进入项目目录
cd project

# 添加所有变动到暂存区
git add .

# 提交到本地仓库
git commit -m "fix: 修复"

# 推送到远程仓库
git push origin master
```



### 常用提交规范

> 不是强制性的，只是建议，随你🙄

- feat : 新功能
- fix : 修复bug
- docs : 文档改变
- style : 代码格式改变
- refactor : 某个已有功能重构
- perf : 性能优化
- test : 增加测试
- build : 改变了build工具 如 grunt换成了 npm
- revert : 撤销上一次的 commit
- chore : 构建过程或辅助工具的变动

::: tip 提示

我介绍过的 [Gitmoji 简明使用](../2022/gitmoji.md) ，就是在这用的！

:::



## 本地基本操作

 Git 管理项目时，文件流转的三个工作区域：Git 的工作目录，暂存区域，以及本地仓库。

图

### 初始化本地库

> 会创建一个 `.git` 目录，不必惊慌🤔

```bash
git init
```



### 查看状态

```bash
git status
# or
git status -s
```



### 添加暂存区

```bash
# 将当前目录及其子目录下所有变更添加到暂存区
git add .

# 将本地库所有变更添加到暂存区
git add -A

# 指定文件添加暂存区
git add file1 file2
```



### 提交本地库

> 为啥要 `-m`参数？ 不添加这个参数的话就会进入编辑器🤔

```bash
# 将文件由 暂存区 添加到 本地仓库，生成版本号
git commit -m '提交信息'

# 直接完成 add 与 commit操作，只影响曾经被 git add 过的文件
git commit -a -m '提交信息'

# 修改最近的一次提交说明， 如果提交说明不小心输错了，可以使用这个命令
git commit --amend -m '提交信息'

# 提交指定文件
git commit -m '提交信息' fileName
```



#### 修改 commit 记录

```bash
# 往最后一次 commit 追加记录，而不新建 commit
git commit --amend

# 合并 commit 记录
git rebase -i HEAD~2
```



### 重置版本

```bash
# 将代码恢复到之前的某个提交过的版本
git reset 版本号 --hard

# 将工作区重置为当前版本
git reset head --hard

# 将代码恢复到之前的某个提交过的版本
git reset head~0 --hard
		head~0 		# 重置回最近一次提交的版本
		head~1		# 重置回上上一次提交的版本
		head~2		# 重置回上上上一次提交的版本
```



### 比较差异

> 其实这些功能有好多插件和软件要来的简明些🙄

```bash
# 比较工作区和暂存区的所有差异，只能查看旧文件的变更（包括修改和删除）
# 不能查看新文件（因为新文件还为被 git 追踪）
git diff

# 比较指定文件工作区和暂存区的差异
git diff fileName

# 比较暂存区和 HEAD 的所有差异
git diff --cached

# 比较指定文件暂存区和 HEAD 的差异
git diff --cached fileName


# 比较两个版本的差异
# 以前者为基准看后者的变化
# HEAD 表示最后一次 commit 对应的版本，HEAD~1 往前一个版本
git diff 版本号1 版本号2
git diff HEAD~1 HEAD
git diff HEAD~2 HEAD

# 比较两个分支指定文件的差异
git diff 分支1 分支2 fileName
```



### 查看日志信息

```bash
# 查看简要日志信息
git reflog

# 查看详细日志信息
git log

# 查看极简日志信息
git log --oneline

# 查看最近 第 n 次的版本信息
git log -n

# 查看所有分支的版本历史
git log --all

# 以图形形式展示版本历史
git log --graph

# 查看涉及到指定文件的 commit 记录
git log fileName

# 查看指定文件每一行修改对应的 commit 记录和作者
git blame fileName
```



## 分支合并 <Badge text="难点" type="danger" />

> Git 的一大特色就是分支，搞懂分支也是会用 Git 的前提

### 创建分支

```bash
# 基于当前分支创建分支，新分支的代码与当前的代码完全相同
git branch <branch>

# 基于指定分支创建分支
git branch <newbranch> <branch>

# 基于某个 commit 创建分支
git branch <branch> commitID
```



### 查看本地分支

```bash
# 用于查看存在的所有分支 * 所在的表示当前分支
git branch

# 查看分支提交信息
git branch -v

# 查看仓库所有分支，包括远程仓库分支
git branch -a
```



### 删除分支

```bash
# 删除本地分支
## 注意：不能在当前分支删除当前分支，需要切换到别的分支才可以删除
git branch -d <branch>

# 如果当前分支有提交，或没有进行合并，是无法使用 -d 删除 ，需要使用 -D
git branch -D <branch>
```



### 切换分支

```bash
# 用于切换分支
git checkout <branch>

# 用于创建新分支同时切换分支
git checkout -b <branch>
```



### 合并分支

> `merge` 和 `rebase`的区别有待学习实践 😟
>
> 如果遇到冲突，需要解决后合并

```bash
# 将其他分支合并到当前分支
git merge <branch>

# 将 A 分支合并到 B 分支，且为 merge 创建 commit
git merge <branchA> <branchB>

# 把当前分⽀基于 B 分⽀做 rebase，以便把 B 分⽀合⼊到当前分⽀
git rebase <branchB>

# 把 A 分⽀基于 B 分⽀做 rebase，以便把 B 分⽀合⼊到 A 分⽀
git rebase <branchB> <branchA>
```



## 远程仓库交互

### 远程仓库

> 在 GitHub，Gitee 等创建的仓库

```bash
# 查看所有远程仓库地址别名
git remote -v

# 为远程仓库起别名 一般起名为 *origin*
git remote add origin <repo>

# 删除远程仓库别名
git remote remove origin

# 修改别名
git remote rename <origin> <newname>
```



### 克隆仓库

> Git 下来🙂

```bash
# 克隆远程仓库到本地
git clone git@github.com:用户名/仓库名.git

# 克隆远程仓库指定分支到本地
# <repo> 代替 git@github.com:用户名/仓库名.git
git clone -b <branch> <repo>
```



### 拉取仓库

::: warning 注意

如果远程和本地不一样，需要先拉下来再推送

:::

```bash
# 拉取远程分支，并与本地分支合并
git pull origin <branch>
```



### 推送仓库

```bash
# 推送本地指定分支到仓库指定分支
git push origin <localbranch>:<branch>

# 如果远程分支被省略，表示将本地分支推送到与之存在追踪关系的远程分支（通常两者同名），
# 如果该远程分支不存在，则会被新建
git push origin(远程仓库名称) master(分支名称)

# 如果省略本地分支名，等同于推送一个空的本地分支到远程分支，表示删除指定的远程分支，等同于
git push origin :master
# 等同于
git push origin --delete master

# 强制推送
git push --force origin master
```



## 写在最后

大部分了解就好，主要是基础操作的命令常用，还有一些分支冲突合并，现在IDE很高级都有图形界面很容易解决。如果有很复杂的问题，百度或者问AI都是很好的。

> 相信二八定律，嗯！🧐



## 参考三三

- AI
- [Git 教程 | 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
