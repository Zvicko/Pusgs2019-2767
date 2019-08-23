import { TicketList } from "./ticket.model";

export class User
{

    constructor(
    public Fullname: string,
    public Email: string,
    public DateOfBirth: Date,
    public PassangerType: TypeOfPassanger, 
    public Password: string,
    public RepeatedPassword: string,
    public Verified: VerificationStatus
  
    )
        {}
    
}

export class LoginUser{

    constructor(
        public Email: string,
        public Password: string,

    ){}

}

export class AddPhotoModel
{

    constructor(
    public PhotoPath: string )
        {}

}

export class ChangePassword
{

    constructor(
    public OldPassword: string,
    public NewPassword: string,
    public NewRepeatedPassword: string )
        {}

}

export class EditUser
{

    constructor(
    public FullName: string,
    public Email: string,
    public BirthDay: Date, 
    public PassangerType : TypeOfPassanger,
   
       )   {}

}

export class Passanger
{
    constructor(
    public FullName: string,
    public Email: string,
    public PhotoPath: string,
    public PassangerType : TypeOfPassanger,
    public Verified: boolean

    ){}

}

export class VerifyUser
{
    constructor(
    public Id : number,
    public IsAccepted : boolean

    ){}

}

export class PassangerTicketList // putnik sa kartom
{
    constructor(
        public FullName: string,
        public Email: string,
        public PassangerTicket: TicketList,
        
    )
    {}

}

// export class ForVerificationStatus
// {
//     constructor(
//         public PassangerType : TypeOfPassanger,
//         p
//     )

// }

