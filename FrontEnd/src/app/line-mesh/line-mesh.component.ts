import { Component, OnInit } from '@angular/core';
import { TimetableServiceService } from '../services/timetable-service.service';
import { TimeTableForMap } from '../models/timetable.model';
import { Station } from '../models/station.model';
import { LineForMap } from '../models/line.model';

@Component({
  selector: 'app-line-mesh',
  templateUrl: './line-mesh.component.html',
  styleUrls: ['./line-mesh.component.css'],
  styles: ['agm-map {height: 300px; width: 400px;}']
})
export class LineMeshComponent implements OnInit {
   
  timeTables : TimeTableForMap[] = [];
  stations : Station[] = [];
  lines : LineForMap[] = [];
  constructor(private timeTableService : TimetableServiceService) { }

  ngOnInit() {
    
  }

  onChange(event)
  {
    console.log("EVENT " + event);
    if(event == "urban")
    {
      this.getUrban();
    }
    else
    {
      this.getSuburban();
    }

  }
  


  getUrban()
  {
    this.stations.length = 0; // ovo prazni niz
    this.timeTableService.getTimeTablesUrban().subscribe(
      data=>
      {
      this.lines = data;
      for(var j = 0; j <this.lines.length; j++)
      {
        for(var i = 0 ;i <this.lines[j].Stations.length;i++)
        {
          this.stations.push(this.lines[j].Stations[i]);
        }
      }
      // this.lines.forEach(l => this.stations.push(...l.Stations));

      },
      error =>
      {


      }
      
    );

  }

  getSuburban()
  {
    this.stations.length = 0; // ovo prazni niz
    this.timeTableService.getTimeTablesSuburban().subscribe(
      data=>
      {
      this.lines = data;
      for(var j = 0; j <this.lines.length; j++)
      {
        for(var i = 0 ;i <this.lines[j].Stations.length;i++)
        {
          this.stations.push(this.lines[j].Stations[i]);
        }
      }
      // this.lines.forEach(l => this.stations.push(...l.Stations));

      },
      error =>
      {


      }
      
    );

  }

}
