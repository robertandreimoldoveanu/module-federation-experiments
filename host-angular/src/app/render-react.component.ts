
import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { loadRemoteModule } from './utils/federation-utils';

@Component({
  selector: 'ui-ng-render-react',
  template: '<div id="react-app"></div>',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RenderReactComponent implements AfterViewInit{
    ngAfterViewInit(): void {
        const module = loadRemoteModule({
            remoteEntry: 'http://localhost:8080/remoteEntry.js',
            remoteName: 'reactBasic',
            exposedModule: 'bootstrapReactComponent',
        }).then(m => {
          debugger;
          m.bootstrapReactComponent(document.getElementById('react-app'));
        });

    }

}
