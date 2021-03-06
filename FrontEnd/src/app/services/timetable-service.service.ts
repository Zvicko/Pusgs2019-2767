import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TimeTableDelete, TimeTableList} from '../models/timetable.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimetableServiceService {

  
  constructor(private HttpClient: HttpClient) { }

  
  getTimeTablesForView():Observable<TimeTableList[]>{
    return this.HttpClient.get<TimeTableList[]>("http://localhost:52295/api/TimeTables",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  getTimeTables():Observable<TimeTableDelete[]>{
    return this.HttpClient.get<TimeTableDelete[]>("http://localhost:52295/api/TimeTables",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  getTimeTablesUrban() : Observable<any>{
    return this.HttpClient.get<any>("http://localhost:52295/api/TimeTables/GetTimeTablesUrban",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });

  }

  getTimeTablesSuburban() : Observable<any>{
    return this.HttpClient.get<any>("http://localhost:52295/api/TimeTables/GetTimeTablesSuburban",{
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
