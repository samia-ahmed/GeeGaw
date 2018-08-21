import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';

import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {
  
  public modalRef: BsModalRef

  user: object
  newUser: object
  mediumRegex: RegExp
  errorMessages: string[] = []
  nameRegex: RegExp
  constructor(private _interlink: InterlinkService, private _router: Router, 
    private modalService: BsModalService) {
    this.user = {
      username: '',
      password: ''
    }
    this.newUser = {
      first_name: '',
      last_name: '',
      newUsername: '',
      email: '',
      newPassword: '',
      confirm: ''
    }
    this.errorMessages = [];
    //we don't have to use this, but its checking password strength
    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.nameRegex = new RegExp("^([a-z][A-Z])");
  }


  public openModal(registration: TemplateRef<any>) {
    this.modalRef = this.modalService.show(registration);
  }

  //login function with basic validation pseudocode
  login() {
    this.errorMessages = [];
    this._interlink.login(this.user, () => {
      this.errorMessages = this._interlink.errorArr;
      this.errorMessages.length > 0 ? this._router.navigate(['']) : this._router.navigate(['dashboard']);
      ;
    })
  }

  register() {
    this.errorMessages = [];
    console.log("passwords", this.newUser['confirm'], this.newUser['newPassword'])
    if (this.newUser['first_name'] == '' || this.newUser['last_name'] == '' || this.newUser['newUsername'] == '' || this.newUser['email'] == '' || this.newUser['newPassword'] == '') {
      this._interlink.errorArr.push("Fields cannot be blank");
      this.errorMessages = this._interlink.errorArr;
    }
    if (this.newUser['confirm'] != this.newUser['newPassword']) {
      this._interlink.errorArr.push("passwords do not match");
      this.errorMessages = this._interlink.errorArr;
    }
    if (this.errorMessages.length > 0) {
      this._router.navigate(['']);
    } else {
      this._interlink.register(this.newUser, () => {
        console.log("back in comp | register")
        this.errorMessages = this._interlink.errorArr;
        this._router.navigate(['dashboard'])
      })
    }
  }

  ngOnInit() {

  }

}
