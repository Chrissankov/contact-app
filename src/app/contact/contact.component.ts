import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { Contact } from '../models/contact.model';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase/auth';

import { TranslocoService } from '@ngneat/transloco';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

function generateFirebaseId(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

declare const google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  editingContactId: string | null = null;
  selectedContact: Contact | null = null;
  user: User | null = null;
  showUserModal = false;
  @ViewChild('addressInput') addressInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService,
    private translocoService: TranslocoService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 ]+$')]],
      address: ['', Validators.required],
    });

    this.loadContacts();
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  ngAfterViewInit() {
    if (!this.addressInput) return;

    if (!google || !google.maps) {
      console.error('Google Maps API not loaded yet!');
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      { types: ['address'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.contactForm.controls['address'].setValue(place.formatted_address);
    });
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
        id: generateFirebaseId(),
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
      address: contact.address,
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
    document.body.classList.add('modal-open');
  }

  closeContactDetail(): void {
    this.selectedContact = null;
    document.body.classList.remove('modal-open');
  }

  addRandomContacts(count: number) {
    this.contactService.addRandomContacts(count);
  }

  openUserModal() {
    this.showUserModal = true;
    document.body.classList.add('modal-open');
  }

  closeUserModal() {
    this.showUserModal = false;
    document.body.classList.remove('modal-open');
  }

  logout() {
    this.authService.logout();
  }

  exportToPDF() {
    const contactsTable = [
      [
        this.translocoService.translate('FORM.NAME'),
        this.translocoService.translate('FORM.EMAIL'),
        this.translocoService.translate('FORM.PHONE'),
        this.translocoService.translate('FORM.ADDRESS'),
      ],
      ...this.contacts.map((c) => [c.name, c.email, c.phone, c.address || '']),
    ];
    const headerMargin: [number, number, number, number] = [0, 0, 0, 10];

    const docDefinition = {
      content: [
        { text: 'Contacts List', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['20%', '30%', '20%', '30%'],
            body: contactsTable,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: headerMargin,
        },
      },
    };
    pdfMake.createPdf(docDefinition).download('contacts.pdf');
  }
}
