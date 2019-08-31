import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {Station,AddLine, UpdateStation, UpdateLine} from '../models/station.model';
import {StationServiceService} from '../services/station-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-station',
  templateUrl: './admin-station.component.html',
  styleUrls: ['./admin-station.component.css'],
  providers: [StationServiceService],
  styles: ['agm-map {height: 300px; width: 400px;}']
})
export class AdminStationComponent implements OnInit {
//fokus na mapi
  latitude : number;
  longitude: number;
//marker  
 markLatitude : number;
 markLongitude : number;
 markLatitude2 : number;
 markLongitude2 : number;
 showMarkerBool : Boolean = false;
 showMarkerBool2 : Boolean = false; // za apdejt formu

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

  //   this.stationForm.controls["Latitude"].disable();
  //  this.stationForm.controls["Longitude"].disable();
  //  this.updateStationForm.controls["Latitude"].disable();
  //  this.updateStationForm.controls["Longitude"].disable();
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

    //
    this.stationService.getStations().subscribe(
      data =>
      {
        this.stationList = data;
        console.log(this.stationList);

      }
    )


    //

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
      (error : HttpErrorResponse) =>
      {
        alert(error.error);

      }

    );

  }

  onSubmit()
  {
    
   
    const station : Station = Object.assign({},this.stationForm.value);
    console.log("STATION")
    console.log(station.Longitude);
    console.log(station.Latitude);
    this.stationService.postStation(station).subscribe(
      data=>
      {
        this.stationForm.reset();

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

      (error : HttpErrorResponse) =>
      {
        alert(error.error);

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
    
    this.markLatitude2 = stationParam.Latitude;
    this.markLongitude2 = stationParam.Longitude;
    this.showMarkerBool2 = true;
   
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
      (error : HttpErrorResponse) =>
      {
        alert(error.error);

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
            this.lineList.splice(i,1);
          }

      },

      error=>
      {


      }

      );
    }

  }

  onSubmitLineUpdate()
  {
    const line : UpdateLine = Object.assign({},this.updateLineForm.value)

    console.log(`Line id : ${line.Id}`);
    console.log(`Line number:${line.LineNumber}`);
    this.stationService.updateLine(line).subscribe(
     data => 
      {
        alert('Uspesno ste azurirali liniju!')

      },
      (error : HttpErrorResponse) =>
      {
        alert(error.error.Message);

      }
    )

  }

  updateLineButton(id,lineNumber)
  {
    this.stationBool = false;
    this.stationListBool = false;
    this.stationUpdateBool = false;
    
    this.lineBool = false;
    this.lineListBool = false;
    this.lineUpdateBool = true;
    console.log("line param id : " + id);
    console.log("line number param " + lineNumber );
    this.updateLineForm.controls['Id'].setValue(id);
    
    this.updateLineForm.controls['LineNumber'].setValue(lineNumber);
  
   
  }

  chosenLocation(event)
  {
   this.markLatitude = event.coords.lat;
   this.markLongitude = event.coords.lng;
   this.stationForm.controls["Latitude"].setValue(this.markLatitude);
   this.stationForm.controls["Longitude"].setValue(this.markLongitude);
   this.showMarkerBool = true;
 
  }

  chosenLocation2(event) // za apdejt 
  {
   this.markLatitude2 = event.coords.lat;
   this.markLongitude2 = event.coords.lng;
   this.updateStationForm.controls["Latitude"].setValue(this.markLatitude2);
   this.updateStationForm.controls["Longitude"].setValue(this.markLongitude2);
   this.showMarkerBool2 = true;
 
  }

}
