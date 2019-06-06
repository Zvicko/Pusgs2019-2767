import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {LoginUser} from '../models/user.model';
import { LoginServiceService } from '../services/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginServiceService]
})
export class LoginComponent implements OnInit {

  userForm : FormGroup;
  constructor(private fb: FormBuilder, private loginService : LoginServiceService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',Validators.required]
    })
  }

  onSubmit() : void{
    const result: LoginUser = Object.assign({}, this.userForm.value);
    alert(JSON.stringify(result));
    this.loginService.getTheToken(result);
    
  }

}
