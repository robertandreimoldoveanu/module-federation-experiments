import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
        children: [
            {
                path: 'about',
                loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'contact',
                loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
            }
        ]
    },
];
