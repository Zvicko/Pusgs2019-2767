import { Component, OnInit } from '@angular/core';
import {PricelistServiceService} from '../services/pricelist-service.service';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {Pricelist} from '../models/pricelist.model';

@Component({
  selector: 'app-admin-pricelist',
  templateUrl: './admin-pricelist.component.html',
  styleUrls: ['./admin-pricelist.component.css'],
  providers : [PricelistServiceService]
})
export class AdminPricelistComponent implements OnInit {

  pricelistForm : FormGroup;
  pricelist : Pricelist;
  constructor(private pricelistService: PricelistServiceService,private fb: FormBuilder) { }

  ngOnInit() {
    this.pricelistService.getPricelist().subscribe(
      data =>{
        this.pricelist = data;
        const pricelistJson = JSON.parse(JSON.stringify(this.pricelist));
        console.log("JSON  pricelist:" + pricelistJson.StartingPrice);
        this.pricelistForm = this.fb.group(
        {
            StartingPrice : [pricelistJson.StartingPrice,[Validators.required,validateNumber]]
      //    StudentMultiplicator:  [+pricelistJson.StudentMultiplicator,Validators.required],
      //    RegularMultiplicator:  [+pricelistJson.RegularMultiplicator,Validators.required],
      //    PensionerMultiplicator: [+pricelistJson.PensionerMultiplicator,Validators.required],
      //    UrbanMultiplicator:  [+pricelistJson.UrbanMultiplicator,Validators.required],
      //    SuburbanMultiplicator: [+pricelistJson.SuburbanMultiplicator,Validators.required],
      //    HourlyTicketMultiplicator: [+pricelistJson.HourlyTicketMultiplicator,Validators.required],
      //    DailyTicketMultiplicator:[+pricelistJson.DailyTicketMultiplicator,Validators.required] ,
      //    MonthlyTicketMultiplicator: [+pricelistJson.MonthlyTicketMultiplicator,Validators.required],
      //    YearlyTicketMultiplicator: [+pricelistJson.YearlyTicketMultiplicator,Validators.required],

         }
      );
      },
      error =>
      {

        alert("greska!");
      }

    );
  }

  onSubmit()
  {
    console.log("Usao");

  }


}
function validateNumber(control: AbstractControl) : {[key: string]:any} | null{
  const valueString : string  = control.value;
  
  let number = Number(valueString);
  // alert(number);
  if(isNaN(number) || number < 0)
  {
    // alert("usao u true");
    return {'validateNumber':true};
  }
  else
  {
    // alert("usao u null");
    return null;
  }
  
  // alert(date);
  // if((date.getFullYear() > minYear || date.getFullYear() < maxYear) && date != null)
  // {

  //   return {'validateDate':true};
  // }
  // else
  // {
  //   return null;
  // }

}

