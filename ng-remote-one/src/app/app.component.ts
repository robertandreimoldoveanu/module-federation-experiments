import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ]
})
export class AppComponent {
  title = 'ng-remote-one';
  type = answer
}
