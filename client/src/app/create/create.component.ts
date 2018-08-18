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
  constructor(private _interlink: InterlinkService, private _router: Router) { 
    this.newPost = {
      caption:''
    }
  }

  new(){
    //validations
    console.log("in comp")
    this._interlink.newPost(this.newPost,()=>{
      this._router.navigate(['dashboard'])
    })
  }

  ngOnInit() {
  }

}
