

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { loadRemoteModule } from './utils/federation-utils';

const viteOptions = {
  remoteEntry: 'http://localhost:5173/remoteEntry.js',
  remoteName: 'ViteMFE',
  exposedModule: 'bootstrapViteComponent'
}


@Component({
  selector: 'ui-ng-render-vite',
  template: '<div id="vite-root"></div>',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RenderViteComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    loadRemoteModule(viteOptions).then(m => {
      console.log('vite module', m);
      m.bootstrapViteComponent();
    });
  }
}
