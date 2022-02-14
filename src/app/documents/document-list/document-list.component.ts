import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  //@Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[];

  constructor(private documentService: DocumentService,
            private router: Router,
            private route: ActivatedRoute) { 

            }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents
      }
    )

  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
/*
  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
   }
*/
}
