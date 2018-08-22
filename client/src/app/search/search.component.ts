import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  currentUser: {
    _id: string,
    username: string
    firstname: string
    lastname: string
    following: object[]
    likes: object[]
  }
  allUsers: object[] = []
  constructor(private _interlink: InterlinkService, private _router: Router) {
    this.currentUser = {
      _id:'',
      username:"",
      firstname: '',
      lastname: '',
      following:[],
      likes:[]
    }
  }
  


  follow(id) {
    this._interlink.follow(id);
  }
  ngOnInit() {
    this._interlink.checkSession((data) => {
      if (data) {
        // console.log("data:",data)
        this.currentUser = data.user;
        this._interlink.getUsers(cb => {
          for(let user of this._interlink.usersArr){
            // console.log("user:",user)
            if(user['_id'] == this.currentUser._id){
              continue;
            }
            for(let follower of user['followers']){
              if(follower == this.currentUser._id){
                user['followers'] = true;
                // console.log("user-in loop/if:",user);
                break;
              }
              user['followers'] = false;
              // console.log("user-in loop:",user);
            }
            this.allUsers.push(user);
          };
          // console.log("component users:", this.allUsers);
        });
        //   .subscribe(res=>{
        //   this.allUsers = res;
        // });
      } else {
        this._router.navigate(['']);
      }
    })
  }
}
