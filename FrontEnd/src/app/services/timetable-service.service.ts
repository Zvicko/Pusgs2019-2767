import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TimeTableDelete} from '../models/timetable.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimetableServiceService {

  
  constructor(private HttpClient: HttpClient) { }

  
  getTimeTables():Observable<TimeTableDelete[]>{
    return this.HttpClient.get<TimeTableDelete[]>("http://localhost:52295/api/TimeTables",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  deleteTimeTable(id) : Observable<any>
  {
    return this.HttpClient.delete(`http://localhost:52295/api/TimeTables/${id}`,);
  }

  postTimeTable(timeTable): Observable<any>
  {
    return this.HttpClient.post("http://localhost:52295/api/TimeTables",timeTable,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });

  }

  postDeparture(departure) : Observable<any>
  {
    return this.HttpClient.post("http://localhost:52295/api/TimeTables/PostDeparture",departure,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });


  }
}
