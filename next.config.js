const webpack = require("webpack");

const path = require("path");
// minify our CSS and extract it to a separate file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//to clean the previous hash minified file when a new one is created after a change
const CleanWebpackPlugin = require("clean-webpack-plugin");
//create a handy report of what's in our bundle when build is completed.
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    if (dev) {
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          "process.env.API_URL": JSON.stringify("http://localhost:3000/"),
        }),
      ];
    }
    if (!dev) {
      config.devtool = "source-map";
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          "process.env.API_URL": JSON.stringify("http://localhost:3000/"),
        }),
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({
          analyzerMode: "static",
        }),
        //Webpack will pick the name for us and add a hash to it.
        //the file name will only change when our CSS changes.
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new CleanWebpackPlugin(),
      ];
    }
    config.module.rules.push({
      test: /\.(svg|png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "imgs",
        },
      },
    });
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["via.placeholder.com", "http://localhost:3000"],
  },
};
