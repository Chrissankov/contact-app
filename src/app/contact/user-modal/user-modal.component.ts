import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent {
  @Input() user!: User | null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
