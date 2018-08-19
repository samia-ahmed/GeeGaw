import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user: {
    username:string,
    _id:string,
    following:object[],
    likes:object[],
    firstname:string,
    lastname:string
  }
  allUsers: object[] =[]
  constructor(private _interlink:InterlinkService, private _router: Router) { }
  follow(id){
    this._interlink.follow(id);
  }
  ngOnInit() {
    this._interlink.checkSession((data) => {
      if (data) {
        this.user = data.user;
        this._interlink.getUsers(cb =>{
            this.allUsers = this._interlink.usersArr;
            console.log("component users:",this.allUsers)
        });
        //   .subscribe(res=>{
        //   this.allUsers = res;
        // });
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
