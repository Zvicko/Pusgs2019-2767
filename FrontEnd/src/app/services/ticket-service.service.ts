import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {User} from '../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http:Http,private HttpClient:HttpClient) { }

  getTicketPrice(ticket):Observable<any>{
    return this.HttpClient.post("http://localhost:52295/api/Tickets/GetTicketPrice",ticket,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  postBuyTicket(ticket) : Observable<any>{
    return this.HttpClient.post("http://localhost:52295/api/Tickets/BuyTicket",ticket,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    }
  );
  }
  VerifyTicket(id) : Observable<any>{
    return this.HttpClient.put(`http://localhost:52295/api/Tickets/VerifyTicket/${id}`, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  DeleteTicket(id) : Observable<any>
  {
    return this.HttpClient.delete(`http://localhost:52295/api/Tickets/${id}`,);
  }

}
