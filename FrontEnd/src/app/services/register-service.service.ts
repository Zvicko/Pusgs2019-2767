import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {User} from '../models/user.model'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: Http,private httpClient: HttpClient) { }

  private parseData(res: Response)
  {

    return res.json() || [];
  }

    postUser(newUser) : Observable<any>{
      console.log("new user :" + JSON.stringify(newUser));
      return this.httpClient.post("http://localhost:52295/api/Account/Register",newUser,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });

    }

    


}
