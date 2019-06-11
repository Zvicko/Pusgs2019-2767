import { Line } from "./line.model";

export class TimeTable
{
    constructor(
    // public Id: number,
    public TransportationType: TypeOfTransportation,
    public DayType: TypeOfDay,
    public LineNumber: number // broj linije, ne id!    
    ){}
  
}