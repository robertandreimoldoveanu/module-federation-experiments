
import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, Injector, inject } from '@angular/core';
import { loadRemoteModule } from './utils/federation-utils';

@Component({
  selector: 'ui-ng-render-react',
  template: '<div id="react-app"></div>',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: 'FEDERATION_TOKEN',
      useValue: 'host-angular'
    }
  ]
})
export class RenderReactComponent implements AfterViewInit{
  // i heard you want an injector so i injected the injector
  private _injector = inject(Injector);

    ngAfterViewInit(): void {
        const module = loadRemoteModule({
            remoteEntry: 'http://localhost:8080/remoteEntry.js',
            remoteName: 'reactBasic',
            exposedModule: 'bootstrapReactComponent',
        }).then(m => {
          debugger;
          m.bootstrapReactComponent(document.getElementById('react-app'), this._injector);
        });

    }

}
