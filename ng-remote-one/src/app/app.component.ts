import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { answer } from './simple';

@Component({
  selector: 'ui-ng-remote-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-remote-one';
  type = answer
}
