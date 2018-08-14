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
  constructor(private _interlink: InterlinkService, private _router: Router) {
    this.user={
      username: '',
      password:''
    }
    this.newUser={
      name:'',
      username:'',
      email:'',
      password:'',
      confirm:''
    }
  }

  // login(){
  //   this._interlink.login(this.user, (data)=>{

  //   })
  // }

  openModal(registration){
    this._interlink.openModal(registration);
  }


  ngOnInit() {
  }

}
