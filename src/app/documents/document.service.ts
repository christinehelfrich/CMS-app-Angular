import { EventEmitter, Output, Injectable } from "@angular/core";

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentService {
    @Output() documentSelected = new EventEmitter<Document>();
    @Output() documentChangedEvent = new EventEmitter<Document[]>();

    private documents: Document[] = [];
    constructor() {
        this.documents = MOCKDOCUMENTS;
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
        this.documentChangedEvent.emit(this.documents.slice());
     }




}