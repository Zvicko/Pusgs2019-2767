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

  constructor(private fb : FormBuilder,private timeTableService : TimetableServiceService) { }

  ngOnInit() {
    this.timeTableForm = this.fb.group(
      {
        TransportationType : ['',[Validators.required]],
        DayType : ['',[Validators.required]],
        Line : [1,[Validators.required,validateNumber]]

      }
    );


  }
  onSubmit()
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
