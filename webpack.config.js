const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.js", "./src/webglTest.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre"
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.useable\.css/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localIdentName: "[path][name]__[local]--[hash:base64:10]"
            }
          }
        ]
      },
      {
        test: /\.useable\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader/useable",
          {
            loader: "css-loader",
            options: {
              localIdentName: "[path][name]__[local]--[hash:base64:10]"
            }
          }
        ]
      },
      {
        test: /\.mystyle$/,
        use: [
          "style-loader",
          "raw-loader",
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  devtool: "source-map"
};
