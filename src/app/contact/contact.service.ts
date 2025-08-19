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
import {
  randFullName,
  randEmail,
  randPhoneNumber,
  randAddress,
} from '@ngneat/falso';

import { Contact } from '../models/contact.model';

function generateFirebaseId(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

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
      address: contact.address,
    });
  }

  generateRandomContacts(count: number): Contact[] {
    const randomContacts: Contact[] = [];
    for (let i = 0; i < count; i++) {
      randomContacts.push({
        id: generateFirebaseId(),
        name: randFullName(),
        email: randEmail(),
        phone: randPhoneNumber({ countryCode: 'LB' }),
        address: randAddress().country + ' - ' + randAddress().city,
      });
    }
    return randomContacts;
  }

  addRandomContacts(count: number) {
    const randoms = this.generateRandomContacts(count);
    randoms.forEach((contact) => this.addContact(contact));
  }
}
