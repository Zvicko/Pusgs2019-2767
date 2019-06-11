import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimetableServiceService {

  constructor(private HttpClient: HttpClient) { }

  postTimeTable(timeTable): Observable<any>
  {
    return this.HttpClient.post("http://localhost:52295/api/TimeTables",timeTable,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });

  }
}
