import { Component, OnInit } from '@angular/core';
import {Passanger, VerifyUser} from '../models/user.model';
import {EditProfileService} from '../services/edit-profile.service';
@Component({
  selector: 'app-controller-users',
  templateUrl: './controller-users.component.html',
  styleUrls: ['./controller-users.component.css']
})
export class ControllerUsersComponent implements OnInit {

  passangers : Passanger[];
  passangerTypes = {0:"Obican",1:"Ucenik",2:"Penzioner"};
  
  constructor(private editProfileService : EditProfileService) { }

  ngOnInit() {

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
    const verifyUser : VerifyUser = new VerifyUser(id,option);
    if(option == 1)
    {
    
      this.editProfileService.VerifyUser(verifyUser).subscribe(
        data =>
        {
          alert("Uspesno ste verifikovali korisnika!");

        }
      )

    }
    else
    {
      this.editProfileService.VerifyUser(verifyUser).subscribe(
        data=>
        {
          alert("Uspesno ste odbili verifikaciju korisnika!");
        }
      )

    }


  }

}
