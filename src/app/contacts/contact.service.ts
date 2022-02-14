import { EventEmitter, Output, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import {MOCKCONTACTS} from './MOCKCONTACTS';




@Injectable()
export class ContactService {
    @Output() contactSelected = new EventEmitter<Contact>();
    @Output() contactChangedEvent = new EventEmitter<Contact[]>();

    private contacts: Contact[] = [];
    constructor() {
        this.contacts = MOCKCONTACTS;
     }
      getContacts() {
          return this.contacts.slice();
      }

      getTheContact(index: number) {
        return this.contacts[index];
    }
      getContact(id: string): Contact {
          let contact: Contact;
          //console.log(this.contacts)

          this.contacts.forEach(contactItem => {
            if (contactItem.id == id) {
                contact = contactItem;
            }
            else {
                return null
            }
          })
          return contact;
      }


      deleteContact(contact: Contact) {
        if (!contact) {
           return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
           return;
        }
        this.contacts.splice(pos, 1);
        this.contactChangedEvent.emit(this.contacts.slice());
     }
}

