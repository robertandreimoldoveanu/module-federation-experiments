import 'zone.js';
import { createApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { NgZone, createComponent } from '@angular/core';

export const attachMicrofrontend = (hostElement: HTMLElement | null) => {
    
    if (!hostElement) {
        throw new Error('Could not find host hostElement');
    }
    console.log(appRoutes);
    createApplication({providers: [provideRouter(appRoutes)]}).then((appRef) => {
        const zone = appRef.injector.get(NgZone);
        zone.run(() => {
          const comp = createComponent(AppComponent, {
            environmentInjector: appRef.injector,
            hostElement: hostElement
          })
      
          appRef.attachView(comp.hostView);
        })
    });
};


// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(appRoutes)],
// }).then((ref) => {
//   console.log(ref);
// });


// createApplication({providers: [provideRouter(appRoutes)]}).then((appRef) => {
//     const zone = appRef.injector.get(NgZone);

//     const hostElement = document.querySelector('outlet-ng-remote-two');

//     zone.run(() => {
//       const comp = createComponent(AppComponent, {
//         environmentInjector: appRef.injector,
//         hostElement: document.querySelector('outlet-ng-remote-two')!
//       })
  
//       appRef.attachView(comp.hostView);
//     })
// });