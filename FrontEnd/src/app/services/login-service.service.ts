import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';
import {LoginUser} from '../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  constructor(private http: Http,private httpClient : HttpClient, private router : Router) { }

  getTheToken(loginUser: LoginUser): any {
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    
    if(!localStorage.jwt)
    {
      

       let x = this.httpClient.post('http://localhost:52295/oauth/token',`username=${loginUser.Email}&password=${loginUser.Password}&grant_type=password`, {"headers": headers}) as Observable<any>
       
      x.subscribe(
        res => {
          console.log(res.access_token);
          
          let jwt = res.access_token;

          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let role = decodedJwtData.role

          console.log('jwtData: ' + jwtData)
          console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
          console.log('decodedJwtData: ' + decodedJwtData)
          console.log('Role ' + role)
          
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role);
          if(role == "Admin")
          {
            this.router.navigateByUrl('/');
          }
          else
          {
            this.router.navigateByUrl('profile');
          }
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }



}
