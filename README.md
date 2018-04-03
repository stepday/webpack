# webpack
这里整理了一些关于webpack打包的常见运用实例

## 什么是webpack
> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

## webpack能干些什么

## WebPack和Grunt以及Gulp相比有什么特性
> https://segmentfault.com/a/1190000006178770
> https://segmentfault.com/a/1190000014112145?utm_source=channel-newest


## 打包目的
- 1、自动后自动打开浏览器 
```
1、安装 插件 npm install --save-dev webpack-dev-server

2、配置devServer

/**
 * 构建本地web服务器配置
 */
devServer: {
    contentBase: "./dist", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    port:"9002",//端口
    inline: true //实时刷新
}

```
- 2、开发文件保存后自动刷新浏览器内容
> 采用了webpack-dev-server插件即可实现hot-reload

- 3、压缩文件；


- 4、分别打包到对应的文件夹内；

- 5、自动给文件加上hash后缀;

- 6、小图片自动转换为base64

- 7、支持css3自动加入兼容前缀
> 引入postcss-loader 插件 npm install postcss-loader autoprefixer -D
> 需要配置 postcss.config.js文件,postcss.config.js 内容如下:
```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
