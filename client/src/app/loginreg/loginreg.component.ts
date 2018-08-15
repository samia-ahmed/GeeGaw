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
    //we don't have to use this, but its checking password strength
    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  }

  // openModal(registration){
  //   this._interlink.openModal(registration);
  // }

  //mock login route to test linking
  login() {
    console.log("logging in from component");
    this._interlink.login(this.user, (res) => {
      console.log(res);
      console.log("back in component");  
      if (res == "success") {
        console.log("made it back");
        // console.log(userCreated);
        
      }
    });
  }

  //login function with basic validation pseudocode
  /* login() {
    this._interlink.login(this.user,(data)=>{
      if(data.user.username.length<8){
        //redirect back
      }
      if(data.user.password.length<8 || data.user.password != this.mediumRegex){
        //redirect back
      }
      //if username doesn't exist in database
      //if password doesn't match password registered to username
      this._router.navigate(['/home'])
    })
  } */

  // register(){
    //!newUsername in db?
      //kick back with error
    //!email in db?
      //kick back with error
    //first_name <=2
      //kick back with error 
    //last_name <=2 
      //kick back with error
    //newPassword != regex
      //kick back with error
    //newPassword < 8
      //kick back with error
    //newPassword != confirm
      //kick back with error
    
      //store user in session
    //reroute to dashboard
  //}

  ngOnInit() {
  }

}
