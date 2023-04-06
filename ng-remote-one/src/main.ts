import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { MtComponent } from './app/mt.component';
import { LoggerService } from './app/services/logger.service';

bootstrapApplication(MtComponent, {
  providers: [
    provideRouter(appRoutes),
    LoggerService,
  ]
}).then((ref) => {
  console.log(ref);
});