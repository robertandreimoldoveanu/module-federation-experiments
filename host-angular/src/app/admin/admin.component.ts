import { Component, Injector, ResolvedReflectiveFactory, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FedLoggerService } from './fed-logger.service';
import { LOGGER_SERVICE } from '../injection-tokens';

@Component({
  selector: 'ui-host-angular-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [
    FedLoggerService,
  ]
})
export class AdminComponent {
   logger = inject(LOGGER_SERVICE);

  ngOnInit() {
    this.logger.log('AdminComponent');
  }
}
