const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;
const shared = Object.keys(dependencies).map((dep) => ({
    [dep]: {
        singleton: true,
        eager: true,
        requiredVersion: dependencies[dep],
    },
}))
module.exports = {
    optimization: {
        runtimeChunk: false,
    },
    output: {
        publicPath: 'http://localhost:4203/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "ngMicrofrontendTwo",
            filename: "remoteEntry.js",
            exposes: {
                './attachMicrofrontend': './src/bootstrap.ts',
            },
            shared,
        }),
    ]
}
