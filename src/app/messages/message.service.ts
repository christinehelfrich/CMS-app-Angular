import { EventEmitter, Output, Injectable } from "@angular/core";
import { Message } from "./message-model";
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable()
export class MessageService {
    messagesChanged = new EventEmitter<Message[]>();
    //@Output() messageSelected = new EventEmitter<Message>();

    private messages: Message[] = [];
    constructor() {
        this.messages = MOCKMESSAGES;
     }
      getMessages() {
        //console.log(this.messages.slice())
          return this.messages.slice();
         
      }

      getMessage(id: string): Message {
          let messageR: Message;
          this.messages.forEach(message => {
              if (message.id) {
                  messageR = message
                  return messageR
              }
              else {
                return null;
              };
          });
          return messageR;
      }

      addMessage(message: Message) {
          console.log(this.messages);
          this.messages.push(message);
          this.messagesChanged.emit(this.messages.slice());
      }

      addMessages(messages: Message[]) {
          this.messages.push(...messages);
          this.messagesChanged.emit(this.messages.slice());
      }

}