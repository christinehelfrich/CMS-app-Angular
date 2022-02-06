import { EventEmitter, Output, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable()
export class ContactService {
    @Output() contactSelected = new EventEmitter<Contact>();

    private contacts: Contact[] = [];
    constructor() {
        this.contacts = MOCKCONTACTS;
     }
      getContacts() {
          return this.contacts.slice();
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

}

