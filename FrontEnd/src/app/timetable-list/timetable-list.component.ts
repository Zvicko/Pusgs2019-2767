import { Component, OnInit } from '@angular/core';
import { TimeTableList } from '../models/timetable.model';
import { TimetableServiceService } from '../services/timetable-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {

  timeTableList : TimeTableList[];
  timeTableFilter : TimeTableList[];
  dayType = {0 : "radni",1 : "subota",2: "nedelja"} // ovo sluzi i za prikaz  u ngFor
  transportation = {0 : "Gradski", 1 : "Prigradski"} // ovo sluzi i za prikaz u ngFor
  timeTableForm : FormGroup;
  constructor(private timeTableService : TimetableServiceService, private fb : FormBuilder) { }

  ngOnInit() {
    this.timeTableForm = this.fb.group(
    {
      LineNumber : [0],
      DayType : [],
      Transportation : []


    }
    );
    this.timeTableService.getTimeTablesForView().subscribe(
      data=>
      {
        this.timeTableList = data;
        this.timeTableFilter = data;
      }
    )
  }

  onSubmit()
  {

    const lineNum = this.timeTableForm.get('LineNumber').value;
    const dayT = this.timeTableForm.get('DayType').value;
    const  trans = this.timeTableForm.get('Transportation').value;
    console.log("line num " + lineNum);
    console.log("dayT " + dayT);
    console.log("trans" + trans);
    this.timeTableFilter = this.timeTableList;
    if(lineNum !== null)
    {
      this.timeTableFilter = this.timeTableList.filter(x => x.Line !== null && x.Line !== undefined) as TimeTableList[];
      this.timeTableFilter = this.timeTableFilter.filter( x => x.Line.LineNumber === lineNum );

      if(dayT !== null)
      {

        if(dayT=="Working")
        {
          
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 0);
        }
        else if(dayT == "Saturday")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 1);

        }
        else if(dayT == "Sunday")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 2);

        }



        

      }
      if(trans !== null)
      {
        if(trans=="Urban")
        {
          
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Transportation === 0);
        }
        else if(trans == "Suburban")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Transportation === 1);

        }


       
      }


    }
    else
    {
      if(dayT !== null)
      {
        if(dayT=="Working")
        {
          
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 0);
        }
        else if(dayT == "Saturday")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 1);

        }
        else if(dayT == "Sunday")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Day === 2);

        }

        

      }
      if(trans !== null)
      {
        if(trans=="Urban")
        {
          
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Transportation === 0);
        }
        else if(trans == "Suburban")
        {
          this.timeTableFilter = this.timeTableFilter.filter(x => x.Transportation === 1);

        }
      }

    }




    
  }
 
}
