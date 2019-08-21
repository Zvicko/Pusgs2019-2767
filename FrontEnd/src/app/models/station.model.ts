export class Station
{
    constructor(
    // public Id : number = 0,
    public Name : string,
    public Address: string,
    public Latitude: number,
    public Longitude: number    
    ){}
  
}

export class UpdateStation
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

export class UpdateLine
{
    constructor(
    public Id : number,
    
    public LineNumber : number,
    public Stations : UpdateStation[]    
    )
    {}

}