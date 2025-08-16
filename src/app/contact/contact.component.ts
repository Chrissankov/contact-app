import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  editingContactId: string | null = null;
  selectedContact: Contact | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 ]+$')]],
    });

    this.loadContacts();
  }

  private loadContacts(): void {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
      this.filteredContacts = [...this.contacts];
    });
  }

  addContact(): void {
    if (this.contactForm.invalid) return;

    if (this.editingContactId) {
      const updatedContact: Contact = {
        id: this.editingContactId,
        ...this.contactForm.value,
      };
      this.contactService.updateContact(updatedContact);
      this.editingContactId = null;
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...this.contactForm.value,
      };
      this.contactService.addContact(newContact);
    }

    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.controls[key].setErrors(null);
    });
    this.loadContacts();
  }

  deleteContact(contactId: string): void {
    this.contactService.deleteContact(contactId);
    this.loadContacts();
  }

  editContact(contact: Contact): void {
    this.editingContactId = contact.id;
    this.contactForm.setValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  cancelEdit(): void {
    this.editingContactId = null;
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.controls[key].setErrors(null);
    });
  }

  openContactDetail(contact: Contact) {
    this.selectedContact = contact;
  }

  closeContactDetail(): void {
    this.selectedContact = null;
  }

  addRandomContacts(count: number) {
    this.contactService.addRandomContacts(count);
  }
}
