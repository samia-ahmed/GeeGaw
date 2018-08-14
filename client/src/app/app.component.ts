import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'GeeGaw';

  // public modalRef: BsModalRef;
  
  
  // constructor(private modalService: BsModalService) {
  //   console.log("test 1");
  // }

  // public openModal(template: TemplateRef<any>) {
  //   console.log("test 2");
  //   this.modalRef = this.modalService.show(template);
  // }
}
