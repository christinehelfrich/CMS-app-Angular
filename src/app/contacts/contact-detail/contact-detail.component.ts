import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }


  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getTheContact(this.id);
      }
    )
  }



  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});

  }


  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts'], {relativeTo: this.route})
 }
 

}
