import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";
import { map } from 'rxjs/operators';
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
        this.getContactshttp()
     }


     getContacts() :Contact[] {
        return this.contacts.slice()
    }

      getContactshttp() {  
        let contacts: Contact[] = [];
        this.http
        .get<{message: string; contacts: any}>(
            "http://localhost:3000/contacts"
        )
        .pipe(map((contactData) => {
            return contactData.contacts.map(contact => {
                return {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    imgUrl: contact.url,
                    id: contact.id,
                    group: contact.group
                }
            })
        }))
        .subscribe(
            (contacts: Contact[] ) => {
                this.contacts = contacts;
                this.maxContactId = this.getMaxId(this.contacts)
                //this.contacts.sort()
                this.contactListChangedEvent.next([...this.contacts])
            }
            
            
        )
      }

      getTheContact(index: number) {
          this.getContactshttp()
          this.contactListChangedEvent
          .subscribe(
              (contacts: Contact[]) => {
                  this.contacts = contacts
              }
          )
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

    addContact(contact: Contact) {
        if (!contact) {
            return
        }

        contact.id = "";
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
        contact,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            this.contacts.push(responseData.contact);
            //this.sortAndSend();
          }
        );
    }

    deleteContact(contact: Contact) {

        if (!contact) {
          return;
        }
        const pos = this.contacts.findIndex(d => d.id === contact.id);
        if (pos < 0) {
          return;
        }
        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
          .subscribe(
            (response: Response) => {
              this.contacts.splice(pos, 1);
              //this.sortAndSend();
            }
          );
      }

/*
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
     */

     updateContact(originalContact: Contact, newContact: Contact, id) {
        if (!originalContact || !newContact) {
            return;
          }
      
          const pos = this.contacts.findIndex(d => {
              
              if (d.id === originalContact.id)
              return d.id
            });
          console.log(pos)
          console.log(originalContact.id)
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Document to the id of the old Document
          newContact.id = originalContact.id;
          //newDocument._id = originalDocument._id;
          //console.log(newContact)
          //console.log(originalContact)
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/contacts/' + id,
            newContact, { headers: headers })
            .subscribe(
              (response: Response) => {
                  console.log(this.contacts[pos])
                this.contacts[pos] = newContact;
                //this.sortAndSend();
              }
            );
     }

     /*

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


*/
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

