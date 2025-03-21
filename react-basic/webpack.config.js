const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const {dependencies} = require("./package.json");
const shared = Object.keys(dependencies).map((dep) => ({
  [dep]: {
    singleton: true,
    // eager: true,
    requiredVersion: dependencies[dep],
  },
}))

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "reactBasic",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        'bootstrapReactComponent': './src/federationExport.ts'
      },
      shared,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
