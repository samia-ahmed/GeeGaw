import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';

import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'; //comment out if modal giving error
@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {
  
  public modalRef: BsModalRef //comment this line out if modal is casuing error

  user: object
  newUser: object
  errorMessages: string[] = []
  registrationErrors: string[] = []
  constructor(private _interlink: InterlinkService, private _router: Router, 
    private modalService: BsModalService) { //comment this line out if modal is causing error
    this.user = {
      username: '',
      password: ''
    }
    //initialize blank user objects on render for model binding, as we type in the form, these are updated live
    this.newUser = {
      first_name: '',
      last_name: '',
      newUsername: '',
      email: '',
      newPassword: '',
      confirm: ''
    }
    this.errorMessages = []
    this.registrationErrors = []
  }


  public openModal(registration: TemplateRef<any>) { //comment this function out if modal is causing error
    this.modalRef = this.modalService.show(registration);
  }

  //login function with basic validation pseudocode
  login() {
    this.errorMessages = [];
    this._interlink.login(this.user, () => {
      this.errorMessages = this._interlink.errorArr;
      //ternary if statement, if there are any errors redirect to login, if not switch to dhasboard
      this.errorMessages.length > 0 ? this._router.navigate(['']) : this._router.navigate(['dashboard']);
      ;
    })
  }

  register() {
    this.errorMessages = [];
    console.log("passwords", this.newUser['confirm'], this.newUser['newPassword'])
    //if any fields are blank, redirect with error. This is to prevent registered without touching form, since errors only trigger when form is dirty/touched
    if (this.newUser['first_name'] == '' || this.newUser['last_name'] == '' || this.newUser['newUsername'] == '' || this.newUser['email'] == '' || this.newUser['newPassword'] == '') {
      this._interlink.errorArr.push("Fields cannot be blank");
      this.registrationErrors = this._interlink.errorArr;
    }
    //make sure passwords match
    if (this.newUser['confirm'] != this.newUser['newPassword']) {
      this._interlink.errorArr.push("passwords do not match");
      this.registrationErrors = this._interlink.errorArr;
    }
    if (this.registrationErrors.length > 0) {
      this._router.navigate(['']);
    } else {
      //if there are no errors, run the register user function
      this._interlink.register(this.newUser, () => {
        console.log("back in comp | register")
        this.registrationErrors = this._interlink.errorArr;
        this.errorMessages = this.registrationErrors;
        //one last error check, this should be redundant but its not, its very important for someone reason, poor design on my part
        this.errorMessages.length > 0 ? this._router.navigate(['']) : this._router.navigate(['dashboard']);
      })
    }
  }

  ngOnInit() {
    //don't think we need this, scared to delete, I think this is making sure the error messages aren't lot on rerender
    this.registrationErrors.map(e =>{
      console.log('e:',e)
      this.errorMessages.push(e)
    })
  }

}
