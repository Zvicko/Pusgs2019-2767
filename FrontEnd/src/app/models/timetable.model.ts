import { Line } from "./line.model";
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

export class TimeTableDelete
{
    constructor(
    public Id: number,
    public TransportationType: TypeOfTransportation,
    public DayType: TypeOfDay,
    public LineNumber: number // broj linije, ne id!    
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