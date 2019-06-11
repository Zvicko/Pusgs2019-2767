import { Component, OnInit } from '@angular/core';
import {TimetableServiceService} from '../services/timetable-service.service';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {TimeTable} from '../models/timetable.model';
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
        LineNumber: [1,[Validators.required,validateNumber]],
        DepartureDate : ['',[Validators.required,validateDate]],
        Time : ['',[Validators.required]]
      }
    );



  }

  timeTableButton()
  {
    this.timeTableBool = true;
    this.departureBool = false;


  }

  departureButton()
  {
    this.departureBool = true;
    this.timeTableBool = false;
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
  
  
  let date = new Date(dateString);
  // alert(date);
  if((date.getFullYear() > minYear && date.getMonth() > minMonth && date.getDay() > minDay) && date != null)
  {

    return {'validateDate':true};
  }
  else
  {
    return null;
  }

}

