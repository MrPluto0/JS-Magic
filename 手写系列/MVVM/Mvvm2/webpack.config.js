const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    port: 8080,
    allowedHosts: "all",
    client: {
      logging: "info", // 日志等级
      progress: true, // 编译进度
      overlay: {
        errors: true,
        warnings: false,
      }, // 全屏覆盖
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: "index.html",
    }),
  ],
};
