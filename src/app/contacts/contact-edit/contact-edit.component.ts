import { 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f', {static: false}) cForm: NgForm;
  subscription: Subscription;
  id: number;
  editMode: boolean = false;
  originalContact: Contact;
  contact: Contact;
  contacts: Contact[];
  groupContacts = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    )

    this.route.params
    .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.originalContact = this.contactService.getContact(String(this.id));
 
        }
        else {
          this.editMode = false;

          return
        }

        if (this.originalContact !== null || undefined || "") {
          //console.log(params['id'])
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          //console.log("the original doc is not null or undefined. original doc: " + this.originalDocument)
        }
        else {
          console.log("the original doc is null or undefined. original doc: " + this.originalContact)
          return
        }

      }
    )


  }

  onCancel() {
    this.router.navigateByUrl('/contacts')
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newId = String(this.id)
    console.log(value)

    const newContact = new Contact(
      newId,
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.url,
      []
    )
    
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact, this.id)
      //console.log(this.id)
      //console.log(this.originalContact)
      //console.log(this.originalContact)
    }
    else {
      this.contactService.addContact(newContact);
      console.log('new contact???')
      //this.router.navigate(['new'], {relativeTo: this.route});

    }




  }
 
}
