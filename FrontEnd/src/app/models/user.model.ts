export class User
{

    constructor(
    public Fullname: string,
    public Email: string,
    public DateOfBirth: Date,
    public PassangerType: TypeOfPassanger, 
    public Password: string,
    public RepeatedPassword: string )
        {}
    // Id: number;
    // fullName: String;
    // userName: String;
    // email: String;
    // birthday: Date;
    // image: String;
    // verified: Boolean;
    // userType: TypeOfUser;
}