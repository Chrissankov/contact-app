import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.contacts = JSON.parse(savedContacts);
    } else {
      this.contacts = [
        {
          id: '1755171454032',
          name: 'Christian Tannoury',
          email: 'tannourychris@gmail.com',
          phone: '76572615',
        },
        {
          id: '1755172808679',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '12345678',
        },
      ];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  addContact(contact: Contact): void {
    this.contacts = [...this.contacts, contact];
    this.saveToStorage();
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  deleteContact(contactId: string): void {
    this.contacts = this.contacts.filter((c) => c.id !== contactId);
    this.saveToStorage();
  }

  updateContact(updateContact: Contact): void {
    this.contacts = this.contacts.map((c) =>
      c.id === updateContact.id ? updateContact : c
    );
    this.saveToStorage();
  }

  searchContacts(term: string): Contact[] {
    const lowerTerm = term.toLowerCase();
    return this.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerTerm) ||
        c.email.toLowerCase().includes(lowerTerm) ||
        c.phone.toLowerCase().includes(lowerTerm)
    );
  }
}
