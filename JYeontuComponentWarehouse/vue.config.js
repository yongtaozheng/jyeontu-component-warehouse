const CompressionPlugin = require("compression-webpack-plugin");

let path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    productionSourceMap: false, // 不生成map文件，解决项目上线首次打开加载慢的问题
    publicPath: "./", // 解决打包文件，访问空白的文件路径问题

    pages: {
        // lintOnSave: false,
        index: {
            entry: "examples/main.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },

    chainWebpack: config => {
        // 用@设置自定义地址
        // 配置快捷路径，@为路径名字，resolve是原路径地址
        config.resolve.alias
            .set("@", resolve("examples")) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set("~", resolve("packages"));

        // gzip 压缩配置
        if (process.env.NODE_ENV === "production") {
            return {
                // gzip会对js、css文件进行压缩处理（压缩效果比较明显，能压缩至原来的1/3左右）；对于图片进行压缩问题，对于png，jpg，jpeg没有压缩效果，对于svg，ico文件以及bmp文件压缩效果达到50%，在productionGzipExtensions: ['js', 'css','svg']设置需要进行压缩的什么格式的文件。
                plugins: [
                    new CompressionPlugin({
                        test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
                        threshold: 10240, // 对超过10k的数据进行压缩
                        deleteOriginalAssets: false // 是否删除原文件
                    })
                ]
            };
        }
    }
    // cdn使用了cdn 可以忽略打包第三方库
    // configureWebpack: {
    //   externals: {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     // 'axios': 'axios',
    //     'element-ui': 'ELEMENT',
    //     // 'moment': 'moment',
    //     'echarts': 'echarts'
    //   }
    // }
};
