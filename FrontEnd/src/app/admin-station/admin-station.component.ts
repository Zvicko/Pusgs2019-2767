import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {Station,AddLine, UpdateStation, UpdateLine} from '../models/station.model';
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
  lineListBool : Boolean = false;
  stationList : UpdateStation[]; // stanice sa servera za pregled brisanje i modifikaciju
  lineList : UpdateLine[]; // linija sa servera za pregled brisanje i modifikaciju
  stationUpdateBool : Boolean = false;
  lineUpdateBool : Boolean = false;
  updateStationForm : FormGroup;
  updateLineForm : FormGroup;
  constructor(private fb: FormBuilder,private fb2: FormBuilder,private fb3: FormBuilder, private fb4 : FormBuilder,private stationService : StationServiceService ) { }

  ngOnInit() {
    this.stationBool = false;
    this.lineBool = false;
    this.stationUpdateBool = false;
    this.stationListBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = false;
    this.stationForm = this.fb.group(
      {
        Name : ['',[Validators.required]],
        Address : ['',[Validators.required]],
        Latitude : ['',[Validators.required,Validators.min(-90),Validators.max(90)]],
        Longitude : ['',[Validators.required,Validators.min(-180),Validators.max(180)]]


      }
    );
    this.updateStationForm = this.fb2.group(

      {
        Id : ['',Validators.required],
        Name : ['',[Validators.required]],
        Address : ['',[Validators.required]],
        Latitude : ['',[Validators.required,Validators.min(-90),Validators.max(90)]],
        Longitude : ['',[Validators.required,Validators.min(-180),Validators.max(180)]]


      }
    );
    
    this.lineForm = this.fb3.group(
      {
        StationName : ['',[Validators.required]],
        LineNumber : ['',[Validators.required]]

      }
    )
    this.updateLineForm = this.fb3.group(
      {
        Id : ['',Validators.required],
        
        LineNumber : ['',[Validators.required]]

      }
    )
  }

  stationButton()
  {
    this.stationBool = true;
    this.stationListBool = false;
    this.stationUpdateBool = false;
    
    this.lineBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = false;
  }

  stationButtonList()
  {
    this.stationBool = false;
    this.stationListBool = true;
    this.stationUpdateBool = false;
    
    this.lineBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = false;
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
    this.stationListBool = false;
    this.stationUpdateBool = false;
    
    this.lineBool = true;
    this.lineListBool = false;
    this.lineUpdateBool = false;

  }

  lineButtonList()
  {
    this.stationBool = false;
    this.stationListBool = false;
    this.stationUpdateBool = false;
    
    this.lineBool = false;
    this.lineListBool = true;
    this.lineUpdateBool = false;
    this.stationService.getLines().subscribe(
      data =>
      {
        this.lineList = data;
        console.log("Line list :" + data);

      },
      error =>
      {


      }

    );

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
  updateStationButton(stationParam : UpdateStation)
  {
    
    this.stationBool = false;
    this.stationListBool = false;
    this.stationUpdateBool = true;
    
    this.lineBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = false;
    
    this.updateStationForm.controls['Name'].setValue(stationParam.Name);
    this.updateStationForm.controls['Address'].setValue(stationParam.Address);
    this.updateStationForm.controls['Latitude'].setValue(stationParam.Latitude);
    this.updateStationForm.controls['Longitude'].setValue(stationParam.Longitude);
    this.updateStationForm.controls['Id'].setValue(stationParam.Id);
   
  }

  onSubmitUpdate()
  {
    const uStation : UpdateStation = Object.assign({},this.updateStationForm.value);
    this.stationService.updateStation(uStation).subscribe(
      data=>
      {

        alert("Uspesno je azurirana stanica!");
        this.stationBool = false;
        this.stationListBool = false;
        this.stationUpdateBool = false;
        
        this.lineBool = false;
        this.lineListBool = false;
        this.lineUpdateBool = false;
      },
      error=>
      {

        alert("Greska!");
      }

    );
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

  deleteLine(id)
  {
    if(confirm("Da li ste sigurni da zelite da izbrisete"))
    {
    this.stationService.deleteLine(id).subscribe(
      data =>
      {
        const i = this.lineList.findIndex( e => e.Id === id);
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

  updateLineButton(lineParam : UpdateLine)
  {
    this.stationBool = false;
    this.stationListBool = false;
    this.stationUpdateBool = false;
    
    this.lineBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = true;

    this.updateLineForm.controls['Id'].setValue(lineParam.Id);
    
    this.updateStationForm.controls['LineNumber'].setValue(lineParam.LineNumber);
  
   
  }

}
