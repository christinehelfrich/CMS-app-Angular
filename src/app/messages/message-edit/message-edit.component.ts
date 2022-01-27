import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import { Message } from '../message-model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: false }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Juan";
  id: string = "3";

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.subjectRef.nativeElement.value;
    const currentSender = this.currentSender;
    const id = this.id;
    const newMessage = new Message(id, subject, msgText, currentSender)
    this.addMessageEvent.emit(newMessage);
    console.log(newMessage);
  }

  onClear() {
    
  }

}
