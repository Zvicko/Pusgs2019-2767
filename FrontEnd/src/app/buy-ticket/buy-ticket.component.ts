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
  ticketForm : FormGroup; // za prijavljenog korisnika 
  ticketForm2 : FormGroup; //za neprijavljenog 
  verifiedBool : boolean = false;
  loggedInBool : boolean = false;
  offerBool : boolean = false;
  user : User;
  totalPrice : number = 0;

  constructor(private verification : EditProfileService,private fb: FormBuilder,private fb2: FormBuilder, private ticketService : TicketServiceService) { }

  ngOnInit() {
    console.log("Usao u ngOninit");
    this.offerBool = false;
    this.loggedInBool = false;
    this.ticketForm = this.fb.group({
      TicketType : ['',[Validators.required]],
      TransportationType : ['',[Validators.required]],

    });
    this.ticketForm2 = this.fb2.group({
      TicketType2 : ['',[Validators.required]],
      TransportationType2 : ['',[Validators.required]],
      PassangerType2 : ['',[Validators.required]]
    });


    this.verification.getProfile().subscribe(
      data =>
      {
        if(data !== null)
        {
        this.user = data;
        console.log("Data :" + data);
        const jsonUser = JSON.parse(JSON.stringify(this.user));
        console.log("JSON USER :" + jsonUser);
        this.verifiedBool = jsonUser.Verified;
        this.loggedInBool = true;
        }
        else
        {
          this.verifiedBool = false;
        this.loggedInBool = false;

        }
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
    buyTicket.PassangerType = this.user.PassangerType;
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

  onSubmit2()
  {

      const  buyTicket : BuyTicket  = Object.assign({}, this.ticketForm2.value); // mislim da ovaj deo ne treba
    buyTicket.TicketType = this.ticketForm2.get('TicketType2').value;
    buyTicket.TransportationType = this.ticketForm2.get('TransportationType2').value;
    buyTicket.PassangerType = this.ticketForm2.get('PassangerType2').value;
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




  onBuyTicket()
  {
    

  }

}
