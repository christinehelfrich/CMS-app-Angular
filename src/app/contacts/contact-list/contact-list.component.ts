import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    //this.contactService.contactChangedEvent
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts
      }
    )
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
    //const newContact = new Contact('3', 'Mock New Contact', "new@contact.com", '208-496-3775', "https://hackster.imgix.net/uploads/attachments/1317693/_Ek101jDIJo.blob?auto=compress%2Cformat&w=900&h=675&fit=min", [])
    //this.contactService.addContact(newContact);
    //console.log(newContact)
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  search(value: string) {
    console.log(this.term)
    this.term = value;
    console.log(this.term)
  }



}


