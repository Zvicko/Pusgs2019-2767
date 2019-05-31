import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
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

  })
  }

}
