import { Component, OnInit } from '@angular/core';
import {Passanger, VerifyUser} from '../models/user.model';
import {EditProfileService} from '../services/edit-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-controller-users',
  templateUrl: './controller-users.component.html',
  styleUrls: ['./controller-users.component.css']
})
export class ControllerUsersComponent implements OnInit {

  VerificationFalse : boolean = false;
  passangers : Passanger[];
  passangerTypes = {0:"Obican",1:"Ucenik",2:"Penzioner"};
  reasonForm : FormGroup;
  verifyUser : VerifyUser;
  constructor(private editProfileService : EditProfileService, private fb: FormBuilder) { }

  ngOnInit() {
    this.VerificationFalse = false;
    this.reasonForm = this.fb.group(
      {
        reason : []
      }
    );
    this.editProfileService.GetAllUnverified().subscribe(
      data =>
      {
        this.passangers = data;

      }
    )
  }

  checkPassanger(p : Passanger)
  {
    console.log("CHECK PASSANGER path : " + p.PhotoPath);
    if(p.PassangerType == 0)
      return false;
    if(p.PhotoPath == null || p.PhotoPath=='Default.gif')
    return true;
  }

  verify(id,option)
  {
    this.verifyUser = new VerifyUser(id,option,"");
    if(option)
    {
    
      this.editProfileService.VerifyUser(this.verifyUser).subscribe(
        data =>
        {
          const i = this.passangers.findIndex( e => e.Id === id);
          if( i != -1)
          {
            this.passangers.splice(i,1);
          }
          alert("Uspesno ste verifikovali korisnika!");

        }
      )

    }
    else
    {
      this.VerificationFalse = true;
      // this.editProfileService.VerifyUser(verifyUser).subscribe(
      //   data=>
      //   {
      //     const i = this.passangers.findIndex( e => e.Id === id);
      //     if( i != -1)
      //     {
      //       this.passangers.splice(i,1);
      //     }

      //     alert("Uspesno ste odbili verifikaciju korisnika!");
      //   }
      // )

    }


  }

  onSubmit()
  {
    this.verifyUser.Reason = this.reasonForm.get('reason').value;
    this.editProfileService.VerifyUser(this.verifyUser).subscribe(
        data=>
        {
          const i = this.passangers.findIndex( e => e.Id === this.verifyUser.Id);
          if( i != -1)
          {
            this.passangers.splice(i,1);
          }

          alert("Uspesno ste odbili verifikaciju korisnika!");
          this.VerificationFalse = false;
        }
      )
  }

}
