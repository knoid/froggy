import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";

const webpackConfig: Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
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
        use: resolve(__dirname, "nearley-loader.js"),
      },
    ],
  },
  output: {
    clean: true,
    path: resolve(__dirname, "..", "build"),
  },
  plugins: [
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
