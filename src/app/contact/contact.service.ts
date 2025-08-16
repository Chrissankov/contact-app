import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { randFullName, randEmail, randPhoneNumber } from '@ngneat/falso';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsCollection;

  constructor(private firestore: Firestore) {
    this.contactsCollection = collection(this.firestore, 'contacts');
  }

  addContact(contact: Contact) {
    return addDoc(this.contactsCollection, contact);
  }

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsCollection, {
      idField: 'id',
    }) as Observable<Contact[]>;
  }

  deleteContact(id: string) {
    const contactDoc = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDoc);
  }

  updateContact(contact: Contact) {
    const contactDoc = doc(this.firestore, `contacts/${contact.id}`);
    return updateDoc(contactDoc, {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  generateRandomContacts(count: number): Contact[] {
    const randomContacts: Contact[] = [];
    for (let i = 0; i < count; i++) {
      randomContacts.push({
        id: '',
        name: randFullName(),
        email: randEmail(),
        phone: randPhoneNumber({ countryCode: 'LB' }),
      });
    }
    return randomContacts;
  }

  addRandomContacts(count: number) {
    const randoms = this.generateRandomContacts(count);
    randoms.forEach((contact) => this.addContact(contact));
  }
}
