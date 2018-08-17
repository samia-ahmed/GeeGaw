import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: {username:""}
  constructor(private _interlink:InterlinkService, private _router: Router) { }
  checkSess(){
    this._interlink.checkSess((data)=>{
      this.user = data.username;
      if(!this.user){
        this._router.navigate(['/']);
      }
    })
  }
  ngOnInit() {
    console.log("in dash")
    this.checkSess();
  }

}
