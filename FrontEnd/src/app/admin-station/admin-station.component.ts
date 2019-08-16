import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {Station,AddLine, StationList} from '../models/station.model';
import {StationServiceService} from '../services/station-service.service';
@Component({
  selector: 'app-admin-station',
  templateUrl: './admin-station.component.html',
  styleUrls: ['./admin-station.component.css'],
  providers: [StationServiceService]
})
export class AdminStationComponent implements OnInit {

  stationForm: FormGroup;
  lineForm : FormGroup;
  stationBool : Boolean = false;
  stationListBool : Boolean = false;
  lineBool : Boolean = false;
  stationList : StationList[];
  constructor(private fb: FormBuilder,private fb2: FormBuilder,private stationService : StationServiceService ) { }

  ngOnInit() {
    this.stationBool = false;
    this.lineBool = false;
    this.stationListBool = false;
    this.stationForm = this.fb.group(
      {
        Name : ['',[Validators.required]],
        Address : ['',[Validators.required]],
        Latitude : ['',[Validators.required,Validators.min(-90),Validators.max(90)]],
        Longitude : ['',[Validators.required,Validators.min(-180),Validators.max(180)]]


      }
    );
    this.lineForm = this.fb2.group(
      {
        StationName : ['',[Validators.required]],
        LineNumber : ['',[Validators.required]]

      }
    )
  }

  stationButton()
  {
    this.stationBool = true;
    this.lineBool = false;
    this.stationListBool = false;

  }

  stationButtonList()
  {
    this.stationBool = false;
    this.lineBool = false;
    this.stationListBool = true;
    this.stationService.getStations().subscribe(
      data =>
      {
        this.stationList = data;
        console.log(this.stationList);

      }
    )
  }

  lineButton()
  {
    this.stationBool = false;
    this.lineBool = true;
    this.stationListBool = false;

  }

  onSubmit()
  {
    const station : Station = Object.assign({},this.stationForm.value);
    this.stationService.postStation(station).subscribe(
      data=>
      {


      },
      error=>
      {

        alert("Greska!");
      }

    );

  }

  deleteStation(id)
  {
    if(confirm("Da li ste sigurni da zelite da izbrisete"))
    {
    this.stationService.deleteStation(id).subscribe(
      data =>
      {
        const i = this.stationList.findIndex( e => e.Id === id);
          if( i != -1)
          {
            this.stationList.splice(i,1);
          }

      },

      error=>
      {


      }

      );
    }
  }
  updateStationButton(stationParam : StationList)
  {
    
    this.stationBool = true;
    this.lineBool = false;
    this.stationListBool = false;
    this.stationForm.controls['Name'].setValue(stationParam.Name);
    this.stationForm.controls['Address'].setValue(stationParam.Address);
    this.stationForm.controls['Latitude'].setValue(stationParam.Latitude);
    this.stationForm.controls['Longitude'].setValue(stationParam.Longitude);

  }

  onSubmitLine()
  {
    const addLine : AddLine = Object.assign({},this.lineForm.value);
    this.stationService.addLineToStation(addLine).subscribe(
     data=> 
     {


      },
    error=>
    {
      alert("Greska!");

    } 
      

    )

  }

}
