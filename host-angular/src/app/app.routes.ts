import { Routes } from '@angular/router';
import { loadRemoteModule } from './utils/federation-utils';
import { RenderViteComponent } from './render-vite.component';


export const appRoutes: Routes = [
    {
        matcher: (url) => {
            return url.toString().startsWith('react') ? { consumed: url } : null;
        },
        loadComponent: () => import('./render-react.component').then(m => m.RenderReactComponent)
    },
    {
        matcher: (url) => {
            return url.toString().startsWith('vite') ? { consumed: url } : null;
        },
        loadComponent: () => import('./render-vite.component').then(m => m.RenderViteComponent)
        // loadComponent: () => loadRemoteModule(viteOptions).then(m => RenderViteComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./federated-providers-wrapper/federated-providers-wrapper.component').then(m => m.FederatedProvidersWrapperComponent)  
    },
    {
        path: 'angularMicrofrontend',
        loadComponent: () => import('./microfrontend-wrapper/microfrontend-wrapper.component').then(m => m.MicrofrontendWrapperComponent),
        // NOTE: remote entry data could be passed on the route i guess? That could work when composing multiple routes together
    }
];
