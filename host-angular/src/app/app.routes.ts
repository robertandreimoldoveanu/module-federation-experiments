import { Routes } from '@angular/router';
import { loadRemoteModule } from './utils/federation-utils';
import { RenderViteComponent } from './render-vite.component';


export const appRoutes: Routes = [
    {
        matcher: (url) => {
            debugger;
            return url.toString().startsWith('react') ? { consumed: url } : null;
        },
        loadComponent: () => import('./render-react.component').then(m => m.RenderReactComponent)
    },
    {
        matcher: (url) => {
            debugger;
            return url.toString().startsWith('vite') ? { consumed: url } : null;
        },
        loadComponent: () => import('./render-vite.component').then(m => m.RenderViteComponent)
        // loadComponent: () => loadRemoteModule(viteOptions).then(m => RenderViteComponent)
    }
];
