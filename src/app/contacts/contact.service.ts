import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    @Output() contactSelected = new EventEmitter<Contact>();
    @Output() contactChangedEvent = new EventEmitter<Contact[]>();

    private contacts: Contact[] = [];
    maxContactId: number;
    constructor(private http: HttpClient) {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId(this.contacts)
     }
      getContacts() {  
        let contacts: Contact[] = [];
        this.http
        .get<Contact[]>(
            "https://cms-backend-2155e-default-rtdb.firebaseio.com/contacts.json"
        )
        .subscribe(
            (contacts: Contact[] ) => {
                this.contacts = contacts;
                this.maxContactId = this.getMaxId(this.contacts)
                this.contacts.sort()
                this.contactListChangedEvent.next(this.contacts)
            }
            
            
        )
        return this.contacts
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

      storeContacts() {
        let contacts = JSON.stringify(this.contacts);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        this.http
            .put(
              'https://cms-backend-2155e-default-rtdb.firebaseio.com/contacts.json',
              contacts, {
                  headers: {'header1': 'content-type', 'header2':'application/json', 'header3': 'Access-Control-Allow-Origin', 'header4': '*'}
              }
            )
            .subscribe(response => {
              this.contactListChangedEvent.next(this.contacts);
            });

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
        this.storeContacts();
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
         this.storeContacts();
     }

     updateContact(originalContact: Contact, newContact: Contact) {
        if ( originalContact || newContact ) {
           let pos = this.contacts.indexOf(originalContact)
           if (pos >= 0) {
               newContact.id = originalContact.id;
               this.contacts[pos] = newContact;
               let contactsListClone = this.contacts.slice();
               this.storeContacts();
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

