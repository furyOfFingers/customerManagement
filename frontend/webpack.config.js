/* eslint-disable */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      router: path.resolve(__dirname, "src/router/"),
      pages: path.resolve(__dirname, "src/pages/"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.styl$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              sourceMap: true,
              modules: {
                localIdentName: "[name]_[local]__[hash:base64:4]",
              },
            },
          },
          { loader: "stylus-loader" },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  plugins: [
    htmlPlugin,
    new ESLintPlugin({
      exclude: "node_modules",
      files: ["src/**/*.ts", "src/**/*.tsx"],
      extensions: ["ts", "tsx"],
    }),
  ],
};
