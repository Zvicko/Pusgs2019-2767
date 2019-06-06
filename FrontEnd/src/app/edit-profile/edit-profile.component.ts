import { Component, OnInit } from '@angular/core';
import {EditProfileService} from '../services/edit-profile.service';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {User} from '../models/user.model';
import {ChangePassword} from '../models/ChangePassword.model';
import {ChangePasswordService} from '../services/change-password.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers:[EditProfileService,ChangePasswordService]
})
export class EditProfileComponent implements OnInit {
  passForm : FormGroup;
  user: User;
  // changePassword : ChangePassword;
  private changePass : boolean = false;
  private changeData : boolean = false;
  private showAddPhoto : boolean = false;
  constructor(private editProfile: EditProfileService,private fb: FormBuilder,private changePassServ : ChangePasswordService) { }

  ngOnInit() {
    this.passForm  = this.fb.group(
      {
        OldPassword: ['',Validators.required],
        NewPassword : ['',Validators.required],
        NewRepeatedPassword:['',Validators.required]
      }
    );
    this.editProfile.getProfile()
    .subscribe(
      data=>{
        this.user = data;
        const jsonUser = JSON.parse(JSON.stringify(this.user));
        console.log("Passanger Type:" + jsonUser.PassangerType);
      //   console.log("FullName :" + jsonUser.FullName);
      //   console.log("RepPass :" + this.user.Password);
      if(jsonUser.PassangerType != 0)
      {
        this.showAddPhoto = true;

      } 
    },
      error=>{
        alert("greska");
      }
    );
  }

  changePassButton()
  {
    this.changePass = true;
    this.changeData = false;

  }
  changeDataButton()
  {
    this.changeData = true;
    this.changePass = false;
  }

  onSubmit(){

    if(this.passForm.get('NewPassword').value == this.passForm.get('NewRepeatedPassword').value)
    {
     const changePassword : ChangePassword  = Object.assign({}, this.passForm.value);
     this.changePassServ.postNewPass(changePassword).subscribe(
      data => {
        alert("Uspesno ste promenili lozinku!");
      },
      error => {
        alert("Niste dobro uneli Vasu staru lozinku!");
      });
    }
    else
    {
      alert("Lozinke Vam se ne podudaraju! Molimo Vas, popunite ponovo!");

    }
  }

}
