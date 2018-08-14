import { Injectable } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  public openModal(registration: TemplateRef<any>) {
    this.modalRef = this.modalService.show(registration);
  }
}
