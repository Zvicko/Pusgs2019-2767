import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {User} from '../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',Validators.required]
    })
  }

  onSubmit() : void{
  
    
  }

}
