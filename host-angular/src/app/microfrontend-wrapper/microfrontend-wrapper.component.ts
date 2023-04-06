import { CommonModule } from '@angular/common';
import { Component, Injector, StaticClassProvider, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';

@Component({
  selector: 'ui-host-angular-microfrontend-wrapper',
  template: '<div #mfeContainer></div>',
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class MicrofrontendWrapperComponent {
  @ViewChild("mfeContainer", { read: ViewContainerRef }) container?: ViewContainerRef;
  ngAfterViewInit() {
    loadRemoteModule({
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      remoteName: 'ngMicrofrontendTwo',
      exposedModule: 'attachMicrofrontend',
    }).then(m => {
      m.attachMicrofrontend(this.container?.element.nativeElement);
    })
  }
}
