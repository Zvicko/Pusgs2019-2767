import { Component, OnInit } from '@angular/core';
import {EditProfileService} from '../services/edit-profile.service';
import {TicketServiceService} from '../services/ticket-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../models/user.model';
import { BuyTicket } from '../models/ticket.model';
@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
  providers: [EditProfileService,TicketServiceService]
})
export class BuyTicketComponent implements OnInit {
  ticketForm : FormGroup;
  verifiedBool : boolean = false;
  offerBool : boolean = false;
  user : User;
  totalPrice : number = 0;

  constructor(private verification : EditProfileService,private fb: FormBuilder, private ticketService : TicketServiceService) { }

  ngOnInit() {
    this.offerBool = false;

    this.ticketForm = this.fb.group({
      TicketType : ['',[Validators.required]],
      TransportationType : ['',[Validators.required]],

    });


    this.verification.getProfile().subscribe(
      data =>
      {
        this.user = data;
        console.log(data);
        const jsonUser = JSON.parse(JSON.stringify(this.user));
        this.verifiedBool = jsonUser.Verified;

      },
      error=>
      {

        alert('Greska!');
      }
      
    )
  }


  onSubmit()
  {

    const  buyTicket : BuyTicket = Object.assign({}, this.ticketForm.value);
    this.ticketService.getTicketPrice(buyTicket).subscribe(
      data =>
      {
        this.totalPrice = Number(data);
        this.offerBool = true;

      },
      error =>
      {
        alert('Greska!');
      }

    )


  }

}
