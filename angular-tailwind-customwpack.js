const util = require('util');
const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(require('fs').writeFile);
const readFile = util.promisify(require('fs').readFile);

async function createApp({ name, prefix}) {
    await exec(`ng new ${name} --prefix=${prefix} --style=scss --routing=true --strict --skip-tests=true --skip-git=true --skip-install --package-manager=pnpm`);
    await installTailwind(name);
    await configTailwind(name);
    await installCustomWebpack(name);
    await configWebpack(name);
    await addRoutesFile(name);
    await removeModules(name);
    await makeAppStandalone(name, prefix);
}

async function installTailwind(name) {
    await exec(`pnpm i -D tailwindcss@latest postcss@latest autoprefixer@latest && npx tailwindcss init -p`, {cwd: `./${name}`});
}

async function configTailwind(name) {
    const tailwindConfigJsFileContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
    await writeFile(`./${name}/tailwind.config.js`, tailwindConfigJsFileContent);


    const stylesHeader = `@tailwind base;
@tailwind components;
@tailwind utilities;
`
    await writeFile(`./${name}/src/styles.scss`, stylesHeader);
}

async function installCustomWebpack(name) {
    await exec(`pnpm i -D @angular-builders/custom-webpack`, {cwd: `./${name}`});
}

async function configWebpack(name) {
    const angularJson = await readFile(`./${name}/angular.json`);
    const angularJsonParsed = JSON.parse(angularJson);
    const projectName = Object.keys(angularJsonParsed.projects)[0];
    angularJsonParsed.projects[projectName].architect.build.builder = '@angular-builders/custom-webpack:browser';
    angularJsonParsed.projects[projectName].architect.build.options.customWebpackConfig = {
        path: './webpack.config.js',
        mergeRules: {
            externals: "replace"
        }
    };
    angularJsonParsed.projects[projectName].architect.serve.builder = '@angular-builders/custom-webpack:dev-server';
    angularJsonParsed.projects[projectName].architect.test.builder = '@angular-builders/custom-webpack:karma';
    await writeFile(`./${name}/angular.json`, JSON.stringify(angularJsonParsed, null, 2));

    const webpackConfigFileContent = `const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;
const shared = Object.keys(dependencies).map((dep) => ({
    [dep]: {
        singleton: true,
        eager: true,
        requiredVersion: dependencies[dep],
    },
}))
module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "${name}",
            filename: "remoteEntry.js",
            shared,
        }),
    ]
}
`;
    await writeFile(`./${name}/webpack.config.js`, webpackConfigFileContent);
}




async function addRoutesFile(name) {
    const routesFileContent = `import { Routes } from '@angular/router';

    export const appRoutes: Routes = [];
    `;
    await writeFile(`./${name}/src/app/app.routes.ts`, routesFileContent);
}

async function removeModules(name) {
    await exec(`rm -rf ./src/app/app.module.ts ./src/app/app-routing.module.ts`, {cwd: `./${name}`});
}

async function makeAppStandalone(name, prefix) {
    const appCompFileContent  =`import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
    
@Component({
  selector: '${prefix}-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class AppComponent {
  title = '${name}';
}
`
    await writeFile(`./${name}/src/app/app.component.ts`, appCompFileContent);

    const mainTsFileContent = `import { bootstrapApplication } from '@angular/platform-browser';
    import { provideRouter } from '@angular/router';
    import { AppComponent } from './app/app.component';
    import { appRoutes } from './app/app.routes';
    
    bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(appRoutes)
      ]
    }).then((ref) => {
      console.log(ref);
    });`
    await writeFile(`./${name}/src/main.ts`, mainTsFileContent);
}

createApp({ name: 'ng-remote-two', prefix: 'ui-ng-remote-two'})