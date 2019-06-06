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
    public PassangerType : TypeOfPassanger
       )   {}

}