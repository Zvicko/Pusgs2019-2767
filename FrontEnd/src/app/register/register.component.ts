import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  this.userForm = this.fb.group({
    fullName : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
    email: ['',[Validators.required,Validators.email]],
    birthdate : ['',[Validators.required,validateDate]]
  })
  }


// function validateDate(control: AbstratctControl) : {[key: string]:any} | null{
//   const date : string  = control.value;


//   return null;

// }

}
function validateDate(control: AbstractControl) : {[key: string]:any} | null{
  const dateString : string  = control.value;
  let minYear = new Date().getFullYear() - 12;
  let maxYear = new Date().getFullYear() - 100;
  let date = new Date(dateString);
  // alert(date);
  if((date.getFullYear() > minYear || date.getFullYear() < maxYear) && date != null)
  {

    return {'validateDate':true};
  }
  else
  {
    return null;
  }

}
