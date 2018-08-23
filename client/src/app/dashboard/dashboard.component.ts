import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: {
    username: string,
    _id: string,
    following: object[],
    likes: object[]
  }
  newsfeed:object[]
  constructor(private _interlink: InterlinkService, private _router: Router) {}

  ngOnInit() {
    this._interlink.checkSession((data) => {
      if (data) {
        this.user = data.user;
        this._interlink.updateNewsFeed((cb)=>{
          this.newsfeed = this._interlink.newsFeed;
          //sort array by createdAt
        });
        
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
