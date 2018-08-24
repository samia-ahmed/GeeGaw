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
    _id: string
    username: string
    firstname: string
    lastname: string
    following: object[]
    likes: object[]
  }
  allUsers: object[] = []
  userArr: object[] = []
  constructor(private _interlink: InterlinkService, private _router: Router) {
    //this is becasue ALL html is loaded immediately, and because on the root index/login page, there is not currentuser to access it gives error unless we set these to blank until filled with session
    this.currentUser = {
      _id: '',
      username: '',
      firstname: '',
      lastname: '',
      following: [],
      likes: []
    }
  }

  follow(id) {
    this._interlink.follow(id);
  }
  updateAllUsers() {
    //sloppy function to filter the users the current user is following from the rest
    if (this.allUsers.length > 0) {
      //loop through all the users
      for (let user of this.allUsers) {
        // console.log("loop-user:", user)
        //if the current user in the loop is the logged in user, skip it since we're already displaying the current user on the top of the page manually.
        if (user['_id'] == this.currentUser._id) {
          continue;
        } else {
          //otherwise, lets check all the users and see which users the current user is following, we'll do that by looking at the following array of each user and checking to see if the current user's id is in it
          for (let follower of user['followers']) {
            //followe is just the ID, haven't populated follower and following object into the session user object, might need to but doing so will break this. FYI.
            if (follower == this.currentUser._id) {
              //if the follower matches the id then the current user does follow the user and we don't need to check the rest
              user['followers'] = true;
              break;
            }
            //we've checked the entire array of followers for this user and the current user isn't here, so they're not following them
            user['followers'] = false;
          }
          this.userArr.push(user);
        }
      };
    }
  }

  ngOnInit() {
    this._interlink.checkSession((data) => {
      if (data) {
        //if user is logged in, set current user to session user
        this.currentUser = data.user;
        //run grab all function
        this._interlink.getUsers();
        //when grab all is run, it will update the behavioral subject which means the following will update, when its updated all its subscribers will be triggered
        this._interlink.allUsers.subscribe((res) => {
          //when the behavior subject is updated we want to set the local arr to whatever the behavior subject is now, and we want to run our function to filter the users the current user is following
          this.allUsers = res;
          this.updateAllUsers();
        });
      } else {
        this._router.navigate(['']);
      }
    })
  }
}
