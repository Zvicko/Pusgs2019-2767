export class Station
{
    constructor(
    public Name : string,
    public Address: string,
    public Latitude: number,
    public Longitude: number    
    ){}
  
}

export class StationList
{
    constructor(
    public Id : number,
    public Name : string,
    public Address: string,
    public Latitude: number,
    public Longitude: number    
    ){}
  
}

export class AddLine
{
    constructor(
    public StationName : string,
    public LineNumber : number    
    )
    {}

}