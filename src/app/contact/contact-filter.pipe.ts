import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'contactFilter',
})
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: Contact[], searchTerm: string): Contact[] {
    if (!contacts || !searchTerm) {
      return contacts;
    }
    const lowerTerm = searchTerm.toLowerCase();
    return contacts.filter((c) => c.name.toLowerCase().includes(lowerTerm));
  }
}
