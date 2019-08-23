import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { Passanger, VerifyUser, PassangerTicketList } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http:Http,private HttpClient:HttpClient) { }

  getProfile():Observable<any>{
    return this.HttpClient.get("http://localhost:52295/api/Users/GetCurrentUser");
  }

  postDataChange(editUser) : Observable<any>{
    console.log("i ovde sam usao, ed:" + editUser);
    console.log("Json :" + JSON.stringify(editUser));
    const endpoint : string ="http://localhost:52295/api/Users/EditUser";
    const formData: FormData = new FormData();
    formData.append('FullName',editUser.FullName.toString());
    formData.append('Email',editUser.Email.toString());
    formData.append('BirthDay', editUser.BirthDay.toString());
    formData.append('PassangerType',editUser.PassangerType.toString());

    
    return this.HttpClient.post(endpoint,editUser,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
}

 postUploadPhoto(photo :File) : Observable<any>
  {
    const endpoint : string ="http://localhost:52295/api/Users/UploadPhoto";
    const formData: FormData = new FormData();
    formData.append("Photo",photo,photo.name);

    return this.HttpClient.post(endpoint, formData);
  }


  GetAllUnverified() : Observable<Passanger[]>{
    return this.HttpClient.get<Passanger[]>("http://localhost:52295/api/Users/GetAllUnverified",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  GetAllVerified() : Observable<PassangerTicketList[]>{
    return this.HttpClient.get<PassangerTicketList[]>("http://localhost:52295/api/Users/GetAllVerified",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  VerifyUser(verifyUser:VerifyUser) : Observable<any>{
    return this.HttpClient.put(`http://localhost:52295/api/Users/VerifyUser/`,verifyUser,{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
  
    });
  }
}
