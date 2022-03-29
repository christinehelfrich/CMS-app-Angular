import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: number;
  private subscription: Subscription
  documents: Document[];
  newContact: Contact = new Contact('3', 'Mock New Contact', "new@contact.com", '208-496-3775', "https://hackster.imgix.net/uploads/attachments/1317693/_Ek101jDIJo.blob?auto=compress%2Cformat&w=900&h=675&fit=min", [])

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }


  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.contact = this.contactService.getContact(String(this.id));
      }
    )
  }



  onEditContact() {
    //this.contactService.updateContact(this.contact, this.newContact)
    this.router.navigate(['edit'], {relativeTo: this.route});

  }


  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts'], {relativeTo: this.route})
 }
 

}
