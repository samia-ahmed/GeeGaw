import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPost:object
  user: {
    username:string,
    _id:string,
    likes:object[]
  }
  constructor(private _interlink: InterlinkService, private _router: Router) { 
    this.newPost = {
      caption:''
    }
  }

  new(){
    //need validations
    this._interlink.newPost(this.newPost,()=>{
      this._router.navigate(['dashboard'])
    })
  }

  
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
