import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import common from "./config.common";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build",
  },
  entry: {
    "dat-viewer": "./src/dat-viewer",
  },
  output: {
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["dat-viewer"],
      title: "Dat Viewer",
      filename: "dat-viewer.html",
    }),
  ],
});
