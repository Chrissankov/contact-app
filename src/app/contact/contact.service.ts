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
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

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
}
