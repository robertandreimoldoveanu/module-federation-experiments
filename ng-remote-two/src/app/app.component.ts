import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
    
@Component({
  selector: 'ui-ng-remote-two-root',
  templateUrl: './app.component.html',
  styles: [
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    `
  ],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class AppComponent {
  title = 'ng-remote-two';
}
