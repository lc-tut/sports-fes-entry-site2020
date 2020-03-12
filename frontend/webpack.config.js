// TODO: CSS とか Sass とかの loader を追加 (Sass のライブラリは dart-sass [npm: sass] が良さげ？)
// TODO: js の場合の babel-loader やら babel のライブラリの追加
// TODO: production 用の minify プラグインとか (mini-css-extract-plugin, optimize-css-assets-webpack-plugin) (terser-webpack-plugin は既に require 可能)
// TODO: development と production の webpack.config.js の分離 (webpack-merge)

const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"
  const plugins = isProduction ? [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./template/index.html"
    })
  ] : [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./template/index.html"
    })
  ]

  return {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: isProduction ? "none" : "source-map",

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index.js"
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader"
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },

    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true,
      // https: true,
      open: true,
      port: 8000,
      proxy: [{
        context: ["/login/_create", "/login/_destroy", "/login/_session", "/api"],
        target: "http://localhost:8080"
      }]
    }
  }
}
