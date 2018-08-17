import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {

  user:object
  newUser:object
  mediumRegex: RegExp
  errorMessages: string[] = []
  registrationErrors: string[] = [] 
  nameRegex: RegExp
  constructor(private _interlink: InterlinkService, private _router: Router) {
    this.user={
      username: '',
      password:''
    }
    this.newUser={
      first_name:'',
      last_name:'',
      newUsername:'',
      email:'',
      newPassword:'',
      confirm:''
    }
    this.errorMessages = [];
    this.registrationErrors = [];
    //we don't have to use this, but its checking password strength
    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.nameRegex = new RegExp("^([a-z][A-Z])");
  }

  // openModal(registration){
  //   this._interlink.openModal(registration);
  // }

  //login function with basic validation pseudocode
  login() {
    this.errorMessages = [];
    this._interlink.login(this.user,()=>{
        this.errorMessages = this._interlink.errorArr;
        this.errorMessages.length > 0 ?  this._router.navigate(['']) : this._router.navigate(['dashboard']);
      ;
    })
  }

  register(){
    this.errorMessages = [];
    console.log("passwords",this.newUser['confirm'],this.newUser['newPassword'])
    if(this.newUser['confirm'] != this.newUser['newPassword']){
      this._interlink.errorArr.push("passwords do not match");
      this.registrationErrors = this._interlink.errorArr;
      this._router.navigate([''])
    }else{
      this._interlink.register(this.newUser,()=>{
        this.registrationErrors = this._interlink.errorArr;
        this.registrationErrors.length == 0 ? this._router.navigate(['dashboard']) : this._router.navigate([''])
      })
    }
  }

  ngOnInit() {

  }

}
