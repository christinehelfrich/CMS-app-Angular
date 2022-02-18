import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    @Output() documentSelected = new EventEmitter<Document>();
    @Output() documentChangedEvent = new EventEmitter<Document[]>();

    private documents: Document[] = []; 
    maxDocumentId: number;
    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId(this.documents);
     }

     getDocuments() {
        return this.documents.slice();
    }

    getTheDocument(index: number) {
        return this.documents[index];
    }

    getDocument(id: string): Document {
        this.documents.forEach(document => {
            if (document.id) {
                return document
            }
            else {
              return null;
            };
        });
        return null;
    }

    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        let documentsListClone = this.documents.slice()
        this.documentListChangedEvent.next(documentsListClone)
     }

     addDocument(newDocument: Document) {

        let documentsListClone: Document[]
         if(typeof(newDocument) === 'undefined') {
             return 
         }
         else {
             this.maxDocumentId++
             
             newDocument.id = String(this.maxDocumentId);
             this.documents.push(newDocument);
             documentsListClone = this.documents.slice();
             //console.log(documentsListClone)
         }

         this.documentListChangedEvent.next(documentsListClone);
     }

     updateDocument(originalDocument: Document, newDocument: Document) {
         if ( originalDocument || newDocument ) {
            let pos = this.documents.indexOf(originalDocument)
            if (pos >= 0) {
                newDocument.id = originalDocument.id;
                this.documents[pos] = newDocument;
                let documentsListClone = this.documents.slice();
                this.documentListChangedEvent.next(documentsListClone)
            }
            else {
                console.log("index of doc is less than 0: " + pos)
                return
            }
         }
         else {
             console.log("probably doesn't exist")
             return
         }

     }

     getMaxId(documents): number {
         let maxId = 0

         documents.forEach(document => {
             let currentId = Number(document.id);
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




}