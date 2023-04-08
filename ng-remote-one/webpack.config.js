const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dependencies = require('./package.json').dependencies;
const shared = Object.keys(dependencies).reduce((acc, dep) => {
    acc[dep] = { singleton: true, strictVersion: true, requiredVersion: dependencies[dep] };
    return acc;
}, {})

module.exports = {
    optimization: {
        runtimeChunk: false,
    },
    output: {
        publicPath: 'http://localhost:4201/',
        module: true,
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'remoteOne',
            library: { type: 'module' },
            filename: 'remoteEntry.js',
            exposes: {
                appRoutes: './src/app/app.routes.ts',
            },
            shared
        }),
    ]
}
