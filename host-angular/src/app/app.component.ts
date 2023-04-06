import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, DoBootstrap, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MicrofrontendService } from './microfrontends/microfrontend.service';

@Component({
  selector: 'ui-host-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    MicrofrontendService,
    {
      provide: 'FEDERATION_TOKEN',
      useValue: 'host-angular'
    }
  ]
})
export class AppComponent implements DoBootstrap{
  title = 'host-angular';

  private mfService = inject(MicrofrontendService);

  ngDoBootstrap(appRef: ApplicationRef): void {
    // nici nu stiu daca acest cod face ceva? wtf
    console.log('ngDoBootstrap', { appRef });
    this.mfService.initialise().then(() => {
      console.log('mfService initialised');
    });
  }
}
