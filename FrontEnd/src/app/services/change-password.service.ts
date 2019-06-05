import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {ChangePassword} from '../models/ChangePassword.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: Http,private httpClient: HttpClient) { }

  postNewPass(newPass) : Observable<any>{
    console.log("new Pass :" + JSON.stringify(newPass));
    return this.httpClient.post("http://localhost:52295/api/Account/ChangePassword",newPass,
  {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })

  });

  }
}
