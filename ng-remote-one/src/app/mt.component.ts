import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-ng-remote-mt',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class MtComponent { }
