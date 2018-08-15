import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TemplateRef } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {
  // public modalRef: BsModalRef;
  constructor(private _http: HttpClient
    // ,private modalService: BsModalService
  ) { }

  // public openModal(registration: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(registration);
  // }

  login(user, cb) {
    console.log("hi from service");
    this._http.post('/loginUser', user).subscribe((res) => {
      console.log("back in service");
      cb(res)
    })    
  }
}
