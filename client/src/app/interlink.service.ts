import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {
  errorMessage: string
  errorArr: string[] = []
  newsFeed:object[]
  feedArr:BehaviorSubject<any[]> = new BehaviorSubject([])
  usersArr:object[]
  allUsers:BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private _http: HttpClient,private _router: Router) {}

  //login-reg component functions
  register(newUser, cb) {
    this.errorMessage = null;
    this.errorArr = [];
    this._http.post('/register', newUser).subscribe((res) => {
      if(res == null){
        this.errorMessage = "The username or email you've entered already exists, please log in";
        this.errorArr.push(this.errorMessage)
      }
      cb(res)
    })
  }
  login(user, cb) {
    this.errorMessage = null
    this.errorArr = []
    this._http.post('/login', user).subscribe((res) => {
      if (res == null) {
        this.errorMessage = "You have entered an invalid username or password";
        this.errorArr.push(this.errorMessage)
      }
      cb(res)
    })
  }

  //dashboard component functions
  updateNewsFeed(){
    this._http.get('/updateFeed').subscribe((res)=>{
      console.log("updating feed:",res)
    })
  }

  //search component functions
  getUsers(cb){
    this._http.get('/allUsers').subscribe((res)=>{
      this.usersArr = res['users'];
      console.log("Users:",this.usersArr)
      this.allUsers.next(this.usersArr);
      cb();
    })
  }
  follow(id){
    console.log("follow-service")
    this._http.get('/follow/'+id).subscribe((res)=>{
      console.log("follow-back in service")
      this._router.navigate(['search'])
    })
  }

  //create component functions
  newPost(post,cb){
    this._http.post('/new',post).subscribe((res)=>{
      cb(res);
    })
  }

  //general functions
  checkSession(cb) {
    this._http.get('/sess').subscribe((res) => {
      cb(res);
    })
  }
}
