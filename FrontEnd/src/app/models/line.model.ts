import { Station } from "./station.model";

export class Line
{
    Id: number;
}

export class LineForList
{
    constructor(
    public Id: number,
    public LineNumber : number
    ){}
}

export class LineForMap
{
    constructor(
        public Id: number,       // ovo 
        public LineNumber : number, // i ovo sam dodao za mapu u realnom vremenu testirati da li ovo valja kod staticke mape
     public Stations : Station[]

    ){}

}