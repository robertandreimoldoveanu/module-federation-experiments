import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { MicrofrontendService } from './app/microfrontends/microfrontend.service';
import { APP_INITIALIZER } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    MicrofrontendService,
    {
      provide: APP_INITIALIZER,
      useFactory: (mfService: MicrofrontendService) => mfService.initialise(),
      deps: [MicrofrontendService],
    }
  ]
}).then((ref) => {
  console.log(ref);
});