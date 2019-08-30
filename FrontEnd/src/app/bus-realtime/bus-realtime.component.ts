import { Component, OnInit, NgZone } from '@angular/core';
import {RealtimeService} from '../services/realtime.service'
import { LineForMap, Line } from '../models/line.model';
import { StationServiceService } from '../services/station-service.service';
import { Station } from '../models/station.model';
@Component({
  selector: 'app-bus-realtime',
  templateUrl: './bus-realtime.component.html',
  styleUrls: ['./bus-realtime.component.css'],
  styles: ['agm-map {height: 400px; width: 800px;}']
})
export class BusRealtimeComponent implements OnInit {

  isConnected: Boolean;
  lat : number;
  lng: number;
  location : string;
  locationArray : string[];
  lines : Line[]
  Stations : Station[] = [];
  constructor(private notifService: RealtimeService, private ngZone: NgZone, private stationService : StationServiceService) {
    this.isConnected = false;
    this.stationService.getLinesWithStations().subscribe(
      data=>
      {
        this.lines = data;
        console.log("this lines [0] id : " + this.lines[0].Id); 
      }

    )
    
   }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForBus();
    
  }


  private checkConnection(){
    this.notifService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.StartTimer()
        }
    });
  }

  subscribeForBus() {
    this.notifService.registerForTimerEvents().subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(location: string){
    this.ngZone.run(() => { 
      console.log("LOCATION " + location);
       this.location = location;
       this.locationArray = location.split(';');
       this.lat = Number(this.locationArray[0]);
       this.lng = Number(this.locationArray[1]);
    });  
    console.log(this.location);
  }

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.location = "";
  }

  

}
