import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Message } from '../message-model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() messageWasSelected = new EventEmitter<Message>();
  messages: Message[] = [
    new Message('2', 'Lunch', 'Dont forget to meet me for lunch.', 'Mom'),
    new Message('3', 'magazine subscription', 'you have a new issue to read now!', 'Ralph Lauren')
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
    
  }


}
