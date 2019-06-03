import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {RegisterServiceService} from '../services/register-service.service';
import {User} from '../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegisterServiceService]
})
export class RegisterComponent implements OnInit {
  userForm : FormGroup;
  defaultPassangerType = "Ordinary";
  constructor(private fb: FormBuilder,private registerServiceService : RegisterServiceService) { }

  ngOnInit() {
  this.userForm = this.fb.group({
    FullName : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
    Email: ['',[Validators.required,Validators.email]],
    DateOfBirth : ['',[Validators.required,validateDate]],
    PassangerType : [''],
    Password: ['',Validators.required],
    RepeatedPassword: ['',Validators.required],
  })
  }

    onSubmit() : void{

      // if(this.userForm.valid)
      // {
        console.log(this.userForm.get('Password'))
        if(this.userForm.get('Password').value == this.userForm.get('RepeatedPassword').value)
        {
        const result: User = Object.assign({}, this.userForm.value);
        // alert(JSON.stringify(result));
        // alert("valid");
        this.registerServiceService.postUser(result).subscribe(
          data => {
            alert("Uspesno ste se registrovali!");
          },
          error => {
            alert("Korisnik sa vasim kredencijalima vec postoji!");
          });
        }
        else
        {
          alert("Lozinke Vam se ne podudaraju! Molimo Vas, popunite ponovo!");

        }
    
    }


  
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
// function validatePassword(control: AbstractControl) : {[key: string]:any} | null{
//   const dateString : string  = control.value;


// }
