import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";
import {MOCKCONTACTS} from './MOCKCONTACTS';




@Injectable()
export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    @Output() contactSelected = new EventEmitter<Contact>();
    @Output() contactChangedEvent = new EventEmitter<Contact[]>();

    private contacts: Contact[] = [];
    maxContactId: number;
    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId(this.contacts)
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
        let contactsListClone = this.contacts.slice()
        this.contactListChangedEvent.next(contactsListClone)
     }

     addContact(newContact: Contact) {

         let contactsListClone: Contact[];
         if(typeof(newContact) === 'undefined') {
             return
         }
         else {
             this.maxContactId++
             newContact.id = String(this.maxContactId);
             this.contacts.push(newContact);
             contactsListClone = this.contacts.slice();  
             console.log(contactsListClone)
         }
         //console.log(contactsListClone)
         this.contactListChangedEvent.next(contactsListClone)
     }

     updateContact(originalContact: Contact, newContact: Contact) {
        if ( originalContact || newContact ) {
           let pos = this.contacts.indexOf(originalContact)
           if (pos >= 0) {
               newContact.id = originalContact.id;
               this.contacts[pos] = newContact;
               let contactsListClone = this.contacts.slice();
               this.contactListChangedEvent.next(contactsListClone)
           }
           else {
               console.log("index of contact is less than 0: " + pos)
               return
           }
        }
        else {
            console.log("probably doesn't exist")
            return
        }

    }



     getMaxId(contacts): number {
        let maxId = 0

        contacts.forEach(contact => {
            let currentId = Number(contact.id);
            if(currentId > maxId) {
                maxId = currentId;
                return maxId;
            }
            else {
                return maxId;
            }

        })
        return maxId

    }









}

