import { EventEmitter, Output, Injectable } from "@angular/core";
import { Message } from "./message-model";
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageService {
    messagesChanged = new EventEmitter<Message[]>();
    //@Output() messageSelected = new EventEmitter<Message>();
    maxMessageId: number;
    private messages: Message[] = [];
    constructor(private http: HttpClient) {
        this.messages = MOCKMESSAGES;
     }
      getMessages() {
        let messages: Message[] = [];
        this.http
        .get<Message[]>(
            "https://cms-backend-2155e-default-rtdb.firebaseio.com/messages.json"
        )
        .subscribe(
            (messages: Message[] ) => {
                this.messages = messages;
                this.maxMessageId = this.getMaxId(this.messages)
                this.messages.sort()
                this.messagesChanged.next(this.messages)
            }
            
            
        )
        return this.messages
         
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

      getMaxId(messages): number {
        let maxId = 0

        messages.forEach(message => {
            let currentId = Number(message.id);
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

    storeMessages() {
        let messages = JSON.stringify(this.messages);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        this.http
            .put(
              'https://cms-backend-2155e-default-rtdb.firebaseio.com/documents.json',
              messages, {
                  headers: {'header1': 'content-type', 'header2':'application/json', 'header3': 'Access-Control-Allow-Origin', 'header4': '*'}
              }
            )
            .subscribe(response => {
              this.messagesChanged.next(this.messages);
            });

    }

}