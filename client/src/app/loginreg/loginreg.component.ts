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

  // register(){
    //!newUsername in db?
      //kick back with error
    //!email in db?
      //kick back with error
    //if(first_name <=2 || last_name <2){
      // this.errorMessage.push("names must be at least two characters");
    //}
    //if(first_name != this.nameRegex || last_name != this.nameRegex){
      // this.errorMessage.push("names can only contain letters");
    //}
    //if(newPassword != this.mediumRegex){
      // this.errorMessage.push("passwords must contain a lowercase, an uppercase and a number and be at least 6 characters long");
    //}
    //if(confirm != password){
      // this.errorMessage.push("passwords do not match");
    //}
    
    //this.errorMessage.length <0 ? this._router.navigate(['dashboard']) : null
  //}

  ngOnInit() {
    
  }

}
