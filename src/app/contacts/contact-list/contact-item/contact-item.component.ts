import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;
  contacts: Contact[]
  private subscription: Subscription;
  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { 

    }


  ngOnInit(): void {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts
        console.log(this.contacts)
        
      }
    )
  }

  /*
  onSelected() {
    console.log(this.contact)
    this.contactService.contactSelected.emit(this.contact);

  }
  */

}
