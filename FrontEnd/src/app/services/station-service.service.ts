import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Station, StationList } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {

  constructor(private HttpClient: HttpClient) { }

  postStation(station) : Observable<any>
  {
    return this.HttpClient.post('http://localhost:52295/api/Stations',station,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    }
  
  
  );

  }

  getStations():Observable<StationList[]>{
    return this.HttpClient.get<StationList[]>("http://localhost:52295/api/Stations",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  deleteStation(id) : Observable<any>
  {
    return this.HttpClient.delete(`http://localhost:52295/api/Stations/${id}`,);
  }


  addLineToStation(addLine) : Observable<any>
  {
    return this.HttpClient.post('http://localhost:52295/api/Stations/AddLine',addLine,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    }
  
  
  );

  }


}
