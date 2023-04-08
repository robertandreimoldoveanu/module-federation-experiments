import { loadRemoteModule } from './federation-utils';
import { Routes } from '@angular/router';
import { Microfrontend } from '../microfrontends/microfrontend.model';
import { appRoutes } from '../app.routes';

export function buildRoutes(options: Microfrontend[]): Routes {
  const lazyRoutes: Routes = options.map(o => ({
    // path: o.routePath,
    matcher: (url) => {
      return url.toString().startsWith(o.routePath) ? {consumed: [url[0]]} : null;
    },
    loadChildren: () => loadRemoteModule(o).then(m => {
      return m[o.ngModuleName];
    }),
  }));

  return [...appRoutes, ...lazyRoutes];
}