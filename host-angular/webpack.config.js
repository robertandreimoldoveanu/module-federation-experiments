const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;
const shared = Object.keys(dependencies).map((dep) => ({
    [dep]: {
        singleton: true,
        strictVersion: true,
        requiredVersion: dependencies[dep],
    },
}))
module.exports = {
    optimization: {
        runtimeChunk: false,
    },
    experiments: {
        outputModule: true,
    },
    output: {
        module: true,
        environment: { module: true },
    },
    externalsPresets: {
        webAsync: true,
    },
    target: 'web',
    plugins: [
        new ModuleFederationPlugin({
            name: "host-angular",
            filename: "remoteEntry.js",
            shared,
        }),
    ]
}
