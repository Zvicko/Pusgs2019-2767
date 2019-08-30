import { Line, LineForList, LineForMap } from "./line.model";
import { Time } from "@angular/common";

export class TimeTable
{
    constructor(
    // public Id: number,
    public TransportationType: TypeOfTransportation,
    public DayType: TypeOfDay,
    public LineNumber: number // broj linije, ne id!    
    ){}
  
}

export class TimeTableList // za korisnicki prikaz
{
   
    constructor(
    public Id  : number,
    public Day : TypeOfDay,
    public Transportation : TypeOfTransportation,
    public Depratures : Departure[],
    public Line : LineForList    // za korisnicki prikaz

    ) {
       
        
    }

}

export class TimeTableDelete
{
    constructor(
    public Id: number,
    public TransportationType: TypeOfTransportation,
    public DayType: TypeOfDay,
    public LineNumber: number // broj linije, ne id!    
    ){}
  
}

export class DepartureList // za korisnicki prikaz
{
    constructor(
    public Id : number,
    public DepartureTime : Date    
    ){}

}

export class Departure
{
    constructor(
    public TimeT: number, // Id reda voznje
    public DepartureDate: Date,
    public Time: Time

    )
    {}

}

export class TimeTableForMap
{
    constructor(
     public Line : LineForMap[],
     public Transportation: TypeOfTransportation   
    ){}
}