import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
// import { HttpClient } from '@angular/common/http'; //breaking JSON conversion so switched to http ^
import { BehaviorSubject } from 'Rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {
  //error handling for login/reg
  errorMessage: string
  errorArr: string[] = []
  //newfeed for dashboard
  newsFeed: object[]
  feedArr: BehaviorSubject<any[]> = new BehaviorSubject([])
  //allusers for search component
  usersArr: object[]
  allUsers: BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private _http: Http, private _router: Router) { }

  //login-reg component functions:
  register(newUser, cb) {
    //clear all previous errors, we're starting again so they're not relevant
    this.errorMessage = null;
    this.errorArr = [];
    this._http.post('/register', newUser).subscribe((res) => {
      //if res is null, it means there was already a username/email in the databse via controller logic
      if (res == null) {
        this.errorMessage = "The username or email you've entered already exists, please log in";
        this.errorArr.push(this.errorMessage)
      }
      //if there are no errors, return to component for redirect to dash
      cb(res)
    })
  }
  login(user, cb) {
    //clear all previous errors, we're starting again so they're not relevant
    this.errorMessage = null
    this.errorArr = []
    this._http.post('/login', user).subscribe((res) => {
      //if res is null, it means there was no username in the database or the entered password didn't match the stored password via controller, intially vague errors message for security reasons
      if (res.json() == null) {
        this.errorMessage = "You have entered an invalid username or password";
        this.errorArr.push(this.errorMessage)
      }
      //if there are no errors, return to component for redirect to dash
      cb(res)
    })
  }

  //dashboard component functions:
  updateNewsFeed(cb) {
    this._http.get('/updateFeed').subscribe((res) => {
      //pass the json into the local array (this.newsFeed)
      this.newsFeed = res.json();
      //use the local array to update the behavioral subject, which should update all its subscribers
      this.feedArr.next(this.newsFeed)
      // console.log("updating feed:", this.newsFeed)
      //return to component
      cb()
    })
  }

  //search component functions:
  getUsers() {
    console.log("hitting get all route in service")
    this._http.get('/allUsers').subscribe((res) => {
      console.log("allUsers-service:",res.json())
      this.usersArr = res.json();
      this.allUsers.next(this.usersArr);
    })
  }
  follow(id) {
    //grab the id from the desired user and pass it to the controller
    this._http.get('/follow/' + id).subscribe((res) => {
      //this doesn't trigger a rerender, so page needs to be manually refreshed to show updated follow status on html
      this._router.navigate(['search'])
    })
  }

  //create component functions:
  newPost(post, cb) {
    this._http.post('/new', post).subscribe((res) => {
      //return back to the component
      cb(res);
    })
  }

  //general functions
  checkSession(cb) {
    this._http.get('/sess').subscribe((res) => {
      //res is the user object and we want to be able to access certain keys, thus we return the res.json() to the component
      cb(res.json());
    })
  }
}
