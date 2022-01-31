import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'WDD 430: Document', 'WDD 430 Description', 'url'),
    new Document('1', 'CSE 341: Document', 'CSE 341 Description', 'url')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
   }

}
