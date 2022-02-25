import { 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f', { static: false }) dForm: NgForm;
  subscripton: Subscription;
  id: number;
  editMode: boolean = false;
  originalDocument: Document;
  document: Document;
  documents: Document[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private documentService: DocumentService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );

    this.route.params
    .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.originalDocument = this.documentService.getTheDocument(this.id);
 
        }
        else {
          this.editMode = false;

          return
        }

        if (this.originalDocument !== null || undefined || "") {
          //console.log(params['id'])
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
          //console.log("the original doc is not null or undefined. original doc: " + this.originalDocument)
        }
        else {
          console.log("the original doc is null or undefined. original doc: " + this.originalDocument)
          return
        }
      }
    )


  }

  onCancel() {
    this.router.navigateByUrl('/documents')

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newId = String(this.id)
 
    const newDocument = new Document(    
      newId,  
      form.value.name,
      form.value.description,
      form.value.url,
      []
      );

    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }
    else {
      this.documentService.addDocument(newDocument);
      //this.router.navigate(['new'], {relativeTo: this.route});

    }
    


  }

}
