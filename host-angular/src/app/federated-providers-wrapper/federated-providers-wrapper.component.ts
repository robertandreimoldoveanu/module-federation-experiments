import { Component, Injector, StaticClassProvider, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { loadRemoteModule } from '../utils/federation-utils';
import { LOGGER_SERVICE } from '../injection-tokens';


@Component({
  selector: 'ui-host-angular-federated-providers-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: '<template #alertContainer></template>',
})
export class FederatedProvidersWrapperComponent {
  @ViewChild("alertContainer", { read: ViewContainerRef }) container?: ViewContainerRef;

  injector = inject(Injector);
  ngAfterViewInit() {
    if (this.container) {
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'remoteOne',
        exposedModule: 'loggerService'
      }).then(m => {
        this.container!.createComponent(AdminComponent, {
          injector: Injector.create({
            providers: [
              { provide: LOGGER_SERVICE, useClass: m.LoggerService } as StaticClassProvider
            ]
          })
        })
      });
        
    }
  }
}
