import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterlinkService {

  constructor(private _http: HttpClient) { }

  login(user) {
    console.log("hi from service");
    this._http.post('/loginUser', user).subscribe()    
  }
}
