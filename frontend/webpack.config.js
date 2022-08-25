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
      interfaces: path.resolve(__dirname, "src/interfaces/"),
      schemes: path.resolve(__dirname, "src/schemes/"),
      constants: path.resolve(__dirname, "src/constants/"),
      store: path.resolve(__dirname, "src/store/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      modules: path.resolve(__dirname, "src/modules/"),
      common: path.resolve(__dirname, "src/common"),
      services: path.resolve(__dirname, "src/services"),
      utils: path.resolve(__dirname, "src/utils"),
      enums: path.resolve(__dirname, "src/enums"),
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
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
    proxy: {
      "/api": "http://localhost:5000",
    },
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
