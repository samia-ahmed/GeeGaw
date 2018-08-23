import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
// import { HttpClient } from '@angular/common/http'; //breaking JSON conversion so switched to http ^
import { BehaviorSubject } from 'Rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {
  errorMessage: string
  errorArr: string[] = []
  newsFeed: object[]
  feedArr: BehaviorSubject<any[]> = new BehaviorSubject([])
  usersArr: object[]
  allUsers: BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private _http: Http, private _router: Router) { }

  //login-reg component functions
  register(newUser, cb) {
    this.errorMessage = null;
    this.errorArr = [];
    this._http.post('/register', newUser).subscribe((res) => {
      if (res == null) {
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
      if (res.json() == null) {
        this.errorMessage = "You have entered an invalid username or password";
        this.errorArr.push(this.errorMessage)
      }
      cb(res)
    })
  }

  //dashboard component functions
  updateNewsFeed(cb) {
    this._http.get('/updateFeed').subscribe((res) => {
      this.newsFeed = res.json();
      this.feedArr.next(this.newsFeed)
      console.log("updating feed:", this.newsFeed)
      cb()
    })
  }

  //search component functions
  getUsers(cb) {
    this._http.get('/allUsers').subscribe((res) => {
      this.usersArr = res['users'];
      console.log("Users:", this.usersArr)
      this.allUsers.next(this.usersArr);
      cb();
    })
  }
  follow(id) {
    console.log("follow-service")
    this._http.get('/follow/' + id).subscribe((res) => {
      console.log("follow-back in service")
      this._router.navigate(['search'])
    })
  }

  //create component functions
  newPost(post, cb) {
    this._http.post('/new', post).subscribe((res) => {
      cb(res);
    })
  }

  //general functions
  checkSession(cb) {
    this._http.get('/sess').subscribe((res) => {
      cb(res.json());
    })
  }
}
