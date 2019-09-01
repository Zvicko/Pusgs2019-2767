import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Station, UpdateStation, UpdateLine} from '../models/station.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LineForMap, Line, LineForList } from '../models/line.model';

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

  updateStation(uStation : UpdateStation) : Observable<any>
  {
    console.log("Update Station :"  + uStation.Id);
    console.log("Update Station :"  + uStation.Name);
    console.log("Update Station :"  + uStation.Address);
    console.log("Update Station :"  + uStation.Latitude);
    console.log("Update Station :"  + uStation.Longitude);
    return this.HttpClient.put<any>(`http://localhost:52295/api/Stations/`,uStation,{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      }),
      
  
    }
  
  );

  }

  getStations():Observable<UpdateStation[]>{
    return this.HttpClient.get<UpdateStation[]>("http://localhost:52295/api/Stations",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  getLinesWithStations():Observable<LineForList[]>{
    return this.HttpClient.get<LineForList[]>("http://localhost:52295/api/Lines/GetLinesWithStations",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  getLines():Observable<UpdateLine[]>{
    return this.HttpClient.get<UpdateLine[]>("http://localhost:52295/api/Lines",{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  getLineHub(id):Observable<any>{
    return this.HttpClient.get<any>(`http://localhost:52295/api/Lines/GetLineHub/${id}`,{
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });
  }

  deleteStation(id) : Observable<any>
  {
    return this.HttpClient.delete(`http://localhost:52295/api/Stations/${id}`,);
  }

  deleteLine(id) : Observable<any>
  {
    return this.HttpClient.delete(`http://localhost:52295/api/Lines/${id}`,);
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

  updateLine(updateLine : UpdateLine) : Observable<any>
  {
    return this.HttpClient.put(`http://localhost:52295/api/Lines/${updateLine.Id}`,updateLine,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })

    });

  }


}
