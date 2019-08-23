import { Component, OnInit } from '@angular/core';
import { PassangerTicketList } from '../models/user.model';
import { EditProfileService } from '../services/edit-profile.service';
import { TicketServiceService } from '../services/ticket-service.service';

@Component({
  selector: 'app-ticket-component',
  templateUrl: './ticket-component.component.html',
  styleUrls: ['./ticket-component.component.css']
})
export class TicketComponentComponent implements OnInit {

  passangers : PassangerTicketList[];
  
  constructor(private editProfile : EditProfileService, private ticketService : TicketServiceService) { }

  ngOnInit() {
    this.editProfile.GetAllVerified().subscribe(
      data =>
      {
        this.passangers = data;

      }
    )
  }

  checkExpireDate(ExpireDate : Date,verified : boolean)
  {
    var d =  new Date(ExpireDate).getTime() - new Date().getTime();
    console.log("d :" + d);
    if(d < 0)
    {
      
      return false;
    }
    else
    {
      if(verified)
      return false;
      else
      return true; 
    }
    

  }
  verifyCard(id)
  {
    this.ticketService.VerifyTicket(id).subscribe(
      data =>
      {
        const i = this.passangers.findIndex( e => e.PassangerTicket.Id === id);
        if( i != -1)
        {
          this.passangers[i].PassangerTicket.VerifiedByController = true;
        }
        // const i = this.passangers.findIndex( e => e.PassangerTicket.Id === id);
        // if( i != -1)
        // {
        //   this.passangers.splice(i,1);
        // }

      }
    )


  }
  cancelCard(id)
  {
    this.ticketService.DeleteTicket(id).subscribe(
    data =>
    {
      const i = this.passangers.findIndex( e => e.PassangerTicket.Id === id);
      if( i != -1)
      {
        this.passangers.splice(i,1);
      }
    }
    )

  }

}
