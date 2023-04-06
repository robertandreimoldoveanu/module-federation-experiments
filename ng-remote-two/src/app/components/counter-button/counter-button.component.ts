import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ui-ng-remote-two-counter-button',
  templateUrl: './counter-button.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CounterButtonComponent {
  count = 0;
  setCount(val: number) {
    this.count = val;
  }
}
