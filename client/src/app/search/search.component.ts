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
    likes:object[]
  }
  constructor(private _interlink:InterlinkService, private _router: Router) { }

  ngOnInit() {
    this._interlink.checkSession((data) => {
      if (data) {
        this.user = data.user;
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
