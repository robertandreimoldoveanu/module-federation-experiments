import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { MtComponent } from './app/mt.component';

bootstrapApplication(MtComponent, {
  providers: [
    provideRouter(appRoutes)
  ]
}).then((ref) => {
  console.log(ref);
});