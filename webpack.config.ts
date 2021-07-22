import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";

const webpackConfig: Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    "dat-viewer": "./src/dat-viewer",
    game: "./src/game",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ne$/,
        use: resolve(__dirname, "src", "webpack-loader-nearley.js"),
      },
    ],
  },
  devServer: {
    contentBase: "./build",
  },
  output: {
    clean: true,
    filename: "[name].bundle.js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["dat-viewer"],
      title: "Dat Viewer",
      filename: "dat-viewer.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["game"],
      title: "Froggy Game",
      filename: "index.html",
      template: "src/game/index.hbs",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};

export default webpackConfig;
