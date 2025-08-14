import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent {
  @Input() contact!: Contact;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
