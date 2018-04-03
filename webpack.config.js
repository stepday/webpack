var path = require("path");
//引入包
var webpack = require('webpack');
//这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html 这在每次生成的js文件名称不同时非常有用（比如添加了hash值）
var HtmlWebpackPlugin = require('html-webpack-plugin');
//分离CSS和JS文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//清空文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
//压缩js文件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    /**
     * webpack打包配置
     */
    devtool: 'eval-source-map', //开发阶段 调试地图
    context: path.resolve(__dirname, '../'),
    //entry: __dirname + "/index.js", //已多次提及的唯一入口文件
    entry: {
        "main": __dirname + "/src/assets/js/main.js",
        "user": __dirname + "/src/assets/js/user.js"
    },
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        //filename: "bundle-[hash].js" //打包后输出文件的文件名 加入hash值避免缓存
        filename: '[name].js',
        publicPath:"static"
        // ,
        // chunkFilename:'bundle-[id].js'
    },
    /**
     * 构建本地web服务器配置
     */
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        host: "127.0.0.1", //主机
        port: "9002", //端口
        compress: true, // 开发服务器是否启动gzip等压缩
        inline: true //实时刷新
    },
    /**
     * 模块配置
     */
    module: {
        rules: [
            //媒体文件处理
            {
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024, // 图片大小 > limit 使用file-loader, 反之使用url-loader
                        outputPath: 'images/' // 指定打包后的图片位置
                    }
                }
            },
            //html内使用images
            {
                test: /\.(html|html)$/,
                use: 'html-withimg-loader',
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            //css处理 包括自动前缀
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    /**
     * 插件引入
     */
    plugins: [
        new webpack.BannerPlugin("版权所有，翻版必究"),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",
            minify: { // 对html文件进行压缩
                removeAttributeQuotes: true // 移除双引号
            },
            inject: true
        }),
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        //new UglifyjsWebpackPlugin(),
        /**
         * 代理服务器配置
         */
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         proxy: {
        //             "/api": "http://localhost:9000"
        //         }
        //     }
        // })
        // 文件复制
	    // new CopyWebpackPlugin([
	    //   {
	    //     from: path.resolve(__dirname, 'src/assets'),
	    //     to: "static",
	    //     ignore: ['.*']
	    //   }
	    // ])
    ],
    /**
     * 文案发生变更后的自动刷新配置
     */
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, // 文件发生改变后多长时间后再重新编译（Add a delay before rebuilding once the first file changed ）
        poll: 1000 //每秒询问的文件变更的次数
    },
    /**
     * 自动补全文件后缀
     */
    resolve: {
        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [".js", ".css", ".json", ".vue", ".scss", ".sass", ".less"],
        alias: {
	      'vue$': 'vue/dist/vue.esm.js',
	      '@': resolve('src'),
	      'assets': resolve('src/assets'),
	      'components': resolve('src/components'),
	    }
    }
}