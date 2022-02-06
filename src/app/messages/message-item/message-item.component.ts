import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message-model';
import { Contact } from '../../contacts/contact.model'
import { ContactService } from 'src/app/contacts/contact.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactService]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService, private messageService: MessageService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    console.log(this.message.sender);
    this.messageSender = contact.name;
  }



}
