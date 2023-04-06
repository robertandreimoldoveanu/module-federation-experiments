const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dependencies = require('./package.json').dependencies;
const shared = Object.keys(dependencies).reduce((acc, dep) => {
    acc[dep] = { singleton: true, eager: true };
    return acc;
}, {})

module.exports = {
    optimization: {
        runtimeChunk: false,
    },
    output: {
        publicPath: 'http://localhost:4201/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'remoteOne',
            filename: 'remoteEntry.js',
            exposes: {
                appRoutes: './src/app/app.routes.ts',
                loggerService : './src/app/services/logger.service.ts',
            },
            shared
        }),
    ]
}
