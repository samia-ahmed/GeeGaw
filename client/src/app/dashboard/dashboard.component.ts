import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';
import { checkAndUpdateBinding } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: { //to keep track of logged in user
    username: string,
    _id: string,
    following: object[],
    likes: object[]
  }
  newsfeed:object[]
  constructor(private _interlink: InterlinkService, private _router: Router) {}

  ngOnInit() {
    this._interlink.checkSession((data) => {
      // handle all logic in session check, might be bad practice, but when i did it outside it was breaking something. Can clean up later
      if (data) {
        //if there is a user logged in, grab all posts from current user and following, direct to controller. 
        this.user = data.user;
        this._interlink.updateNewsFeed((cb)=>{
          this.newsfeed = this._interlink.newsFeed;
          //sort array by createdAt
        });
        //if there is no user logged in, we don't need to run anything else, just redirect back to log in
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
