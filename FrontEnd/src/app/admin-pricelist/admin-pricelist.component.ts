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
    this.pricelistForm = this.fb.group(
      {
          StartingPrice : ['',[Validators.required,validateNumber]],
          StudentMultiplicator:  ['',[Validators.required,validateNumber]],
          RegularMultiplicator:  ['',[Validators.required,validateNumber]],
          PensionerMultiplicator: ['',[Validators.required,validateNumber]],
          UrbanMultiplicator:  ['',[Validators.required,validateNumber]],
          SuburbanMultiplicator: ['',[Validators.required,validateNumber]],
          HourlyTicketMultiplicator: ['',[Validators.required,validateNumber]],
          DailyTicketMultiplicator:['',[Validators.required,validateNumber]],
          MonthlyTicketMultiplicator: ['',[Validators.required,validateNumber]],
          YearlyTicketMultiplicator: ['',[Validators.required,validateNumber]]

       }
    );

    this.pricelistService.getPricelist().subscribe(
      data =>{
        this.pricelist = data;
        const pricelistJson = JSON.parse(JSON.stringify(this.pricelist));
        console.log("DATA ID:" + data.ID);
        console.log("DATA Id:" + data.Id);
        console.log("JSON  pricelist:" + pricelistJson.StartingPrice);
        this.pricelistForm.controls['StartingPrice'].setValue(pricelistJson.StartingPrice);
        this.pricelistForm.controls['StudentMultiplicator'].setValue(pricelistJson.StudentMultiplicator);
        this.pricelistForm.controls['RegularMultiplicator'].setValue(pricelistJson.RegularMultiplicator);
        this.pricelistForm.controls['PensionerMultiplicator'].setValue(pricelistJson.PensionerMultiplicator);
        this.pricelistForm.controls['UrbanMultiplicator'].setValue(pricelistJson.UrbanMultiplicator);
        this.pricelistForm.controls['SuburbanMultiplicator'].setValue(pricelistJson.SuburbanMultiplicator);
        this.pricelistForm.controls['HourlyTicketMultiplicator'].setValue(pricelistJson.HourlyTicketMultiplicator);
        this.pricelistForm.controls['DailyTicketMultiplicator'].setValue(pricelistJson.DailyTicketMultiplicator);
        this.pricelistForm.controls['MonthlyTicketMultiplicator'].setValue(pricelistJson.MonthlyTicketMultiplicator);
        this.pricelistForm.controls['YearlyTicketMultiplicator'].setValue(pricelistJson.YearlyTicketMultiplicator);
      },
      error =>
      {

        alert("greska!");
      }

    );
  }

  onSubmit()
  {
    const submitPricelist : Pricelist = Object.assign({}, this.pricelistForm.value);
    submitPricelist.Id = this.pricelist.Id;
    this.pricelistService.putPricelist(submitPricelist).subscribe(
      data =>{
        alert("Uspesno ste azurirali cenovnik!");
      },
      error =>{
        alert("Azuriranje cenovnika nije uspelo!");
      }

    )

  }


}
function validateNumber(control: AbstractControl) : {[key: string]:any} | null{
  const valueString : string  = control.value;
  
  let number = Number(valueString);
  
  if(isNaN(number) || number < 0)
  {
    
    return {'validateNumber':true};
  }
  else
  {
    
    return null;
  }
  


}

