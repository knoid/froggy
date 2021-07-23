import { merge } from "webpack-merge";
import common from "./config.common";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
  },
});
