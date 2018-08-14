import { Component, OnInit } from '@angular/core';
import { InterlinkService } from './../interlink.service';

@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {
  user: String; 

  constructor(private _interlink: InterlinkService) { 
    this.user = "samia";
  }

  login() {
    this._interlink.login(this.user);
    console.log("logging in from component");
  }

  ngOnInit() {
  }

}
