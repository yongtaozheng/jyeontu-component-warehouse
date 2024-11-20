# 代码片段保存复用插件

## 介绍

代码片段保存复用 vscode 插件，支持同步代码片段到自己指定的 gitee 仓库，实现不同电脑上 vscode 可以共享代码片段。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b59bba4bb9bb46228280300468d78555~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732169041&x-orig-sign=rbuf%2F%2BeG53bObAXsFbbpbDrOTjE%3D)

## 一、准备工作

### 新建 gitee 仓库

直接在[gitee](https://gitee.com/)上新建仓库即可。

我们不想要书签信息公开，所以选择勾选上私有：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb7675a1de1743e0b4bb8ab45db885e5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1223&h=602&s=54696&e=png&b=ffffff)

创建完的初始仓库是这样的：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dda682abe0f40308dcb6d67a4c7f0bb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=981&h=387&s=36807&e=png&b=fcfcfc)

我们再新增一个目录`codeSnippets`，用于存放代码片段相关的文件：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1712a7e0c1ad42539da9cd4fb27b4fc0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732169569&x-orig-sign=b6guV8z1Uhu23vKbX3PZqCKtwjs%3D)

在该目录下新增一个文件`snippets.json`，用于保存代码片段数据：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7bcb7a91b4154c2588dcc681bf7efbe1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732169662&x-orig-sign=%2BSSD0OeKZ7ZoGhMoX3Sq%2BJ8f4J4%3D)

## 二、插件使用

### 1、插件安装

直接在 vscode 插件商场中搜索`saveCodeSnippetsAndReusePlugins`

![1732084277206.jpg](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/724cc112ee954cc8846eefc8bf95991b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170683&x-orig-sign=NdvXO7CRbEPfk%2FceBXrxjAvsIBI%3D)

点击安装即可：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/84e7915b74494dd6b9ec566b8bd72e1e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170646&x-orig-sign=WqukAZK80Cwg%2BJWLA5Unaxo%2FUmg%3D)

### 2、仓库配置

![cf2cd2bf7b88fb0f4ff632dca0b6125.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/825249a7f342425194b0d0a83b23983e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170808&x-orig-sign=oxw%2FOFi%2BRmcmUFQDg5OZMSxS0F4%3D)

需要配置三个属性：

- token

在 gitee 设置中生成然后复制填写即可：
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/195123b2050440a4b916d3830b390406~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170763&x-orig-sign=5OAsf3qojoSD%2F%2FlJ%2FLYSfTAJouU%3D)

- owner

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a99c29f46c90493ca2f333dc4ac4c790~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170866&x-orig-sign=l6d5%2FWZ%2FFqhA%2Bz%2FuIp7wnKSQDDA%3D)

- repo

前面准备工作中新建的仓库，填写仓库名

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/af79f696b5bd4fabb6e0da6410d31e40~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732170985&x-orig-sign=21gX2cEAHcTbeCd6QqbqaOYjOFI%3D)

### 3、代码片段同步

在多机使用时，可以同步拉取其他电脑保存的代码片段

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/924f3a1144464f80930bbfb6f0d15e80~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732171293&x-orig-sign=RTmgbZGbpL2ipYYfl5bpv0JY9tU%3D)

### 4、保存代码片段

- 快捷键（ctrl + alt + s）

将选中的代码保存为代码片段，可以自己命名

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cb0b4b1f77d54771b28d5968544b06b1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732171374&x-orig-sign=xhjtRK5PwNODlIjJqkir4rRLiHI%3D)

### 5、插入代码片段

- 快捷键（ctrl + alt + i）

选择已保存的代码片段插入到当前代码

![a8f808d63cac7ae7ab4c99502731341.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b7de6f52038a4189a2d0b9427d2145c4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732171556&x-orig-sign=i%2FK88PYkXonnzdLzTf%2BJfcwb1eM%3D)

### 5、删除代码片段

- 快捷键（ctrl + alt + d）

选择需要删除的代码片段进行删除

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0970e4392f8b4621a264478f16409a2a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSlllb250dQ==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQwMjQ0MjkwNzI3Mjk0In0%3D&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732171627&x-orig-sign=HrXYTCZAd3xavjwa0Fk%2F1M63FxE%3D)

## 源码

组件库已开源到 gitee，有兴趣的也可以到这里看看：[https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse](https://gitee.com/zheng_yongtao/save-code-snippets-and-reuse)

> 🌟 觉得有帮助的可以点个 star~

> 🖊 有什么问题或错误可以指出，欢迎 pr~

> 📬 有什么想要实现的功能或想法可以联系我~

## 公众号

关注公众号『`前端也能这么有趣`』，获取更多有趣内容。

## 说在后面

> 🎉 这里是 JYeontu，现在是一名前端工程师，有空会刷刷算法题，平时喜欢打羽毛球 🏸 ，平时也喜欢写些东西，既为自己记录 📋，也希望可以对大家有那么一丢丢的帮助，写的不好望多多谅解 🙇，写错的地方望指出，定会认真改进 😊，偶尔也会在自己的公众号『`前端也能这么有趣`』发一些比较有趣的文章，有兴趣的也可以关注下。在此谢谢大家的支持，我们下文再见 🙌。
