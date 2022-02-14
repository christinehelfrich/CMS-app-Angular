import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

import { Document } from '../document.model';
//import { relative } from 'path';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: number;
  nativeWindow: any;


  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindRefService) {

                this.nativeWindow = windowRefService.getNativeWindow();
               }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getTheDocument(this.id);
      }
    )
  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});

  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], {relativeTo: this.route})
 }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

}
