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
  errorMessage: string
  errorArr: string[] = []
  constructor(private _http: HttpClient
    // ,private modalService: BsModalService
  ) {}

  // public openModal(registration: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(registration);
  // }

  register(newUser, cb) {
    this._http.post('/register', newUser).subscribe((res) => {
      cb(res)
    })
  }

  login(user, cb) {
    this.errorMessage = null
    this.errorArr = []
    this._http.post('/login', user).subscribe((res) => {
      if (res == null) {
        this.errorMessage = "You have entered an invalid username or password";
        this.errorArr.push(this.errorMessage)
      }
      cb(res)
    })
  }

  checkSess(cb) {
    this._http.get('/sess').subscribe((res) => {
      cb(res);
    })
  }
}
