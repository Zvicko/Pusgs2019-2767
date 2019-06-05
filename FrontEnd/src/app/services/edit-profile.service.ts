import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http:Http,private HttpClient:HttpClient) { }

  getProfile():Observable<any>{
    return this.HttpClient.get("http://localhost:52295/api/Users/GetCurrentUser");
  }
}
