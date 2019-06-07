import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PricelistServiceService {

  constructor(private http:Http,private HttpClient:HttpClient) { }

  getPricelist():Observable<any>{
    return this.HttpClient.get("http://localhost:52295/api/Pricelists/1");
  }

  putPricelist(pricelist) : Observable<any>{
    return this.HttpClient.put("http://localhost:52295/api/Pricelists/1",pricelist,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }
}
