# 代码片段保存复用插件

## 介绍

代码片段保存复用 vscode 插件，支持代码提示自动补全代码片段，支持同步代码片段到自己指定的 gitee 仓库，实现不同电脑上 vscode 可以共享代码片段。
![1732086587361](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086587361.png)

## 一、准备工作

### 新建 gitee 仓库

直接在[gitee](https://gitee.com/)上新建仓库即可。

我们不想要书签信息公开，所以选择勾选上私有：
![1732086618889](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086618889.png)

创建完的初始仓库是这样的：
![1732086633592](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086633592.png)

我们再新增一个目录`codeSnippets`，用于存放代码片段相关的文件：

![1732086650074](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086650074.png)

在该目录下新增一个文件`snippets.json`，用于保存代码片段数据：

![1732086768121](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086768121.png)

## 二、插件使用

### 1、插件安装

直接在 vscode 插件商场中搜索`saveCodeSnippetsAndReusePlugins`

![1732086794486](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086794486.png)

点击安装即可：

![1732086807664](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086807664.png)

### 2、仓库配置

![1732086822279](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086822279.png)

需要配置三个属性：

- token

在 gitee 设置中生成然后复制填写即可：
![1732086839272](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086839272.png)

- owner

![1732086853300](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086853300.png)

- repo

前面准备工作中新建的仓库，填写仓库名

![1732086865788](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086865788.png)

### 3、代码片段同步

在多机使用时，可以同步拉取其他电脑保存的代码片段

![1732086881019](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086881019.png)

### 4、保存代码片段

- 快捷键（ctrl + alt + s）

将选中的代码保存为代码片段，可以自己命名

![1732086893618](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086893618.png)

### 5、插入代码片段

- 快捷键（ctrl + alt + i）

选择已保存的代码片段插入到当前代码

![1732086905857](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086905857.png)

### 6、删除代码片段

- 快捷键（ctrl + alt + d）

选择需要删除的代码片段进行删除

![1732086924239](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732086924239.png)

### 7、代码片段自动补全

根据已保存的代码片段生成自动补全提示，快速将已保存的代码片段插入当前代码中。

![1732242428642](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732242428642.png)

### 8、代码片段补全语言类型

- 快捷键（ctrl + alt + e）

配置代码补全语言标识符，即需要触发代码片段补全的语言类型，默认为：`html,css,javascript,typescript,json,svg,less,sass,scss,vue,jsx,tsx,bat,sh`，在配置好的这些语言类型文件编辑中才会触发代码片段补全功能

![1732242517310](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse/raw/master/images/README/1732242517310.png)

## 源码

组件库已开源到 gitee，有兴趣的也可以到这里看看：[https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse)

> 🌟 觉得有帮助的可以点个 star~

> 🖊 有什么问题或错误可以指出，欢迎 pr~

> 📬 有什么想要实现的功能或想法可以联系我~

## 公众号

关注公众号『`前端也能这么有趣`』，获取更多有趣内容。

## 说在后面

> 🎉 这里是 JYeontu，现在是一名前端工程师，有空会刷刷算法题，平时喜欢打羽毛球 🏸 ，平时也喜欢写些东西，既为自己记录 📋，也希望可以对大家有那么一丢丢的帮助，写的不好望多多谅解 🙇，写错的地方望指出，定会认真改进 😊，偶尔也会在自己的公众号『`前端也能这么有趣`』发一些比较有趣的文章，有兴趣的也可以关注下。在此谢谢大家的支持，我们下文再见 🙌。
