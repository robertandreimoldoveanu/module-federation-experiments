const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;
const shared = Object.keys(dependencies).map((dep) => ({
    [dep]: {
        singleton: true,
        eager: true,
        requiredVersion: dependencies[dep],
    },
}))
shared.push({
    "react": { singleton: true, eager:true, requiredVersion: "^18.2.0"},
    "react-dom": { singleton: true, eager:true, requiredVersion: "^18.2.0"},
    "react-router-dom": { singleton: true, eager:true, requiredVersion: "^6.9.0"},
});
console.log(shared);
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
