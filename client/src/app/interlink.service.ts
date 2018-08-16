import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs';

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
    this._http.post('/loginUser', user).subscribe((res) => {
      cb(res)
    })    
  }

  checkSess(cb){
    this._http.get('/sess').subscribe((res)=>{
      cb(res);
    })
  }
}
