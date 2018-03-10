# 基于Vue的在线电台应用

--------
## 概述
本项目基于Vue.js,是一个仿移动端nativeApp的webApp。项目的大致开发流程是:     
1.需求分析 → 2.设计图分析 → 3.模块化构思 → 4. 项目目录规划 → 5.静态资源准备 → 6.编码 
因无搜索相关接口,暂不提供搜索功能。

## 在线预览
[项目演示地址](https://ghostratel.github.io/portfolio/FM/index.html#/channel)      

移动端体验更佳     

![二维码](https://ws1.sinaimg.cn/large/e3507465gy1fp7qwdtzehj207s07s0si.jpg)

### 用户界面
* 频道分类页
* 电台详情页
* 播放详情页
* 用户中心页

### 数据来源

本项目所有数据均来自[这里](https://api.imjad.cn/qqfm.md),感谢提供的接口支持!

### 技术栈

* [x] Vue
* [x] Vuex
* [x] Vue-Router
* [x] Vue-cli
* [x] SCSS
* [x] Axios
* [x] VUX
* [x] JSONP
* [x] ESlint

### 项目目录
![](https://ws1.sinaimg.cn/large/e3507465gy1fp7r82l8phj20h80dsq3i.jpg)

### 开始
#### 开发环境
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
#### 生产环境

``` bash
# build for production with minification
npm run build

```