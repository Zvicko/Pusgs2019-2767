import { Component, OnInit } from '@angular/core';
import {TimetableServiceService} from '../services/timetable-service.service';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {TimeTable,Departure,TimeTableDelete} from '../models/timetable.model';
import { Time } from '@angular/common';
@Component({
  selector: 'app-admin-timetable',
  templateUrl: './admin-timetable.component.html',
  styleUrls: ['./admin-timetable.component.css'],
  providers : [TimetableServiceService]
})
export class AdminTimetableComponent implements OnInit {

  timeTableForm : FormGroup;
  departureForm : FormGroup;
  timeTableBool : boolean = false;
  departureBool : boolean = false;
  timeTableDelete : TimeTableDelete[];
  deleteBool : boolean;
  constructor(private fb : FormBuilder,private fb2: FormBuilder,private timeTableService : TimetableServiceService) { }

  ngOnInit() {
    this.timeTableForm = this.fb.group(
      {
        // Id : ['',[Validators.required,validateNumber]],
        TransportationType : ['',[Validators.required]],
        DayType : ['',[Validators.required]],
        LineNumber : [1,[Validators.required,validateNumber]]

      }
    );
    this.departureForm = this.fb2.group(
      {
        TimeT: [1,[Validators.required,validateNumber]],
        DepartureDate : ['',[Validators.required,validateDate]],
        Time : ['',[Validators.required]]
      }
    );



  }

  timeTableButton()
  {
    this.timeTableBool = true;
    this.departureBool = false;
    this.deleteBool = false;

  }

  departureButton()
  {
    this.departureBool = true;
    this.timeTableBool = false;
    this.deleteBool = false;
  }

  deleteButton()
  {
    this.timeTableService.getTimeTables().subscribe(
      data =>
      {
        this.timeTableDelete = data;
        this.deleteBool = true;

      }
    )

  }

  deleteTimeTable(id)
  {
    if(confirm("Da li ste sigurni da zelite da izbrisete"))
    {
      console.log("Id je" + id);
    this.timeTableService.deleteTimeTable(id).subscribe(
      data =>
      {
       alert("Uspesno ste izbrisali red voznje!"); 
      },
      error =>
      {
        alert("Greska!");

      }
    );
    }
  }



  onSubmit()
  {
    
    const timeTable : TimeTable = Object.assign({}, this.timeTableForm.value);
    this.timeTableService.postTimeTable(timeTable).subscribe(
      data =>
      {
  
        alert('Uspesno ste dodali red voznje!');
      },
      error =>
      {
        alert('Greska!');
      }

    );
  }

  onSubmitDeparture()
  {
    const departure : Departure = Object.assign({}, this.departureForm.value);
   
    this.timeTableService.postDeparture(departure).subscribe(
      data=>
      {


      },
      error=>
      {


      }

    )

  }

}



function validateNumber(control: AbstractControl) : {[key: string]:any} | null{
  const valueString : string  = control.value;
  
  let number = Number(valueString);
  
  if(isNaN(number) || number <= 0)
  {
    
    return {'validateNumber':true};
  }
  else
  {
    
    return null;
  }
  


}

function validateDate(control: AbstractControl) : {[key: string]:any} | null{
  const dateString : string  = control.value;
  let minYear = new Date().getFullYear();
  let minMonth = new Date().getMonth();
  let minDay = new Date().getDay();
  
  let minDate = new Date();
  let date = new Date(dateString);
  // alert(date);
  // if((date.getFullYear() > minYear && date.getMonth() > minMonth && date.getDay() > minDay) && date != null)
  // {

  //   return {'validateDate':true};
  // }
  // else
  // {
  //   return {'validateDate':false};
  // }

  if(date > minDate)
  {
    return null;

  }
  else
  {
    return {'validateDate':true};

  }

}

