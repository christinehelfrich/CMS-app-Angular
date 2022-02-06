import { EventEmitter, Output, Injectable } from "@angular/core";

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentService {
    @Output() documentSelected = new EventEmitter<Document>();

    private documents: Document[] = [];
    constructor() {
        this.documents = MOCKDOCUMENTS;
     }

     getDocuments() {
        return this.documents.slice();
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




}