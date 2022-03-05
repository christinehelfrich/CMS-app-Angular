import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    startedEditing = new Subject<number>();
    @Output() documentSelected = new EventEmitter<Document>();
    @Output() documentChangedEvent = new EventEmitter<Document[]>();

    private documents: Document[] = []; 
    maxDocumentId: number;
    constructor(private http: HttpClient) {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId(this.documents);
     }


     getDocuments() {
        let documents: Document[] = [];
        this.http
        .get<Document[]>(
            "https://cms-backend-2155e-default-rtdb.firebaseio.com/documents.json"
        )
        .subscribe(
            (documents: Document[] ) => {
                this.documents = documents;
                this.maxDocumentId = this.getMaxId(this.documents)
                this.documents.sort()
                this.documentListChangedEvent.next(this.documents)
            }
            
            
        )
        return this.documents
        
    }

    storeDocuments() {
        let documents = JSON.stringify(this.documents);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        this.http
            .put(
              'https://cms-backend-2155e-default-rtdb.firebaseio.com/documents.json',
              documents, {
                  headers: {'header1': 'content-type', 'header2':'application/json', 'header3': 'Access-Control-Allow-Origin', 'header4': '*'}
              }
            )
            .subscribe(response => {
              this.documentListChangedEvent.next(this.documents);
            });

    }

    getTheDocument(index: number) {
        return this.documents[index];
    }

    getDocument(id): Document {
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
        this.storeDocuments();
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

         this.storeDocuments()
     }

     updateDocument(originalDocument: Document, newDocument: Document) {
         if ( originalDocument || newDocument ) {
            let pos = this.documents.indexOf(originalDocument)
            if (pos >= 0) {
                newDocument.id = originalDocument.id;
                this.documents[pos] = newDocument;
                let documentsListClone = this.documents.slice();
                this.storeDocuments()
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