import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'counter',
        loadComponent: () => import('./components/counter-button/counter-button.component').then(m => m.CounterButtonComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
    },
];
