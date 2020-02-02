// vue.config.js
const webpack = require("webpack");
module.exports = {
  //部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致
  //   publicPath: process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/"

  //   生产环境构建文件的目录
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "",
  //   指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: "index.html",
  //默认情况下,生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
  filenameHashing: true,
  //   设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败
  lintOnSave: true,
  // 你也可以通过设置让浏览器 overlay 同时显示警告和错误
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    // 配置代理服务器解决跨域数据请求问题
    proxy: {
      "/baidu": {
        target: "https://openapi.baidu.com", // 目标地址
        ws: true, // 是否代理websockets
        changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL,
        pathRewrite: {
          "^/baidu": "/"
        }
      }
    }
  },
  //   当 lintOnSave 是一个 truthy 的值时，eslint-loader 在开发和生产构建下都会被启用。如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置：
  lintOnSave: process.env.NODE_ENV !== "production",
  // >>>>>>>>>>>>>>>兼容部分
  //   默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  //   如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。(基于环境有条件地配置行为)
  configureWebpack: {
    // entry: { app: ["babel-polyfill"] }
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.mode = "production";
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  //   }
  // }
};
