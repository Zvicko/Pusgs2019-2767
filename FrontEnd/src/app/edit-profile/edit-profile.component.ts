import { Component, OnInit } from '@angular/core';
import {EditProfileService} from '../services/edit-profile.service';
import {FormGroup,FormControl,Validators,FormBuilder,AbstractControl} from '@angular/forms';
import {User} from '../models/user.model';
import {EditUser} from '../models/user.model';
import {ChangePassword} from '../models/user.model';
import {ChangePasswordService} from '../services/change-password.service';
import {AddPhotoModel} from '../models/user.model';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers:[EditProfileService,ChangePasswordService]
})
export class EditProfileComponent implements OnInit {
  passForm : FormGroup; // form builder za promenu lozinke
  userForm : FormGroup;
  imageForm: FormGroup;
  defaultImg : string = "/assets/images/Default.gif"
  user: User;
  
  fileToUpload : File = null;
  // changePassword : ChangePassword;
  private changePass : boolean = false;
  private changeData : boolean = false;
  private showAddPhoto : boolean = false;
  private addPhoto : boolean = false;

  constructor(private editProfile: EditProfileService,private fb3: FormBuilder,private fb: FormBuilder,private fb2: FormBuilder,private changePassServ : ChangePasswordService) { }

  ngOnInit() {

    this.imageForm = this.fb3.group(
      {
        PhotoPath : [this.defaultImg,Validators.required]

      }
    )

     this.passForm  = this.fb.group(
       {
         OldPassword: ['',Validators.required],
         NewPassword : ['',Validators.required],
         NewRepeatedPassword:['',Validators.required]
       }
     );
    this.editProfile.getProfile()
    .subscribe(
      data=>{
        this.user = data;
        const jsonUser = JSON.parse(JSON.stringify(this.user));
        console.log("Passanger Type:" + jsonUser.PassangerType);
        let  birthday = new Date (jsonUser.BirthDay); // prikazuje dan manje od pravog rodjendana, verovatno zato sto je prilikom registracije stavljeno u 12 AM
        birthday.setDate(birthday.getDate()+1); // zbog toga sam morao da dodam taj jedan dan, kako bi bilo tacno
        let birthdaystring = birthday.toISOString().substring(0, 10);
        console.log("birdaj :" + birthday);
        let passangerTypeString;
        
        if(jsonUser.PassangerType == 0 )
        {
          passangerTypeString = 'Ordinary';
        }
        else if(jsonUser.PassangerType == 1)
        {
          passangerTypeString = 'Student';
         
            if(jsonUser.PhotoPath != null)
            {
              this.imageForm.controls['PhotoPath'].setValue(jsonUser.PhotoPath);
              this.defaultImg = jsonUser.PhotoPath;
            }
          
        }
        else if(jsonUser.PassangerType == 2)
        {
          passangerTypeString = 'Pensioner';
          if(jsonUser.PhotoPath != null)
            {
              this.imageForm.controls['PhotoPath'].setValue(jsonUser.PhotoPath);
              this.defaultImg = jsonUser.PhotoPath;
            }

        }
      if( passangerTypeString == 'Ordinary' )
      {
        this.showAddPhoto = true;

      }
      this.userForm  = this.fb.group(
        {
          FullName: [jsonUser.FullName,Validators.required],
          Email: [jsonUser.Email,[Validators.required,Validators.email]],
          BirthDay: [birthdaystring,[Validators.required,validateDate]],
          PassangerType : [passangerTypeString]
        }
      ); 
    },
      error=>{
        alert("greska");
      }
    );
  }

   changePassButton()
  {
     this.changePass = true;
     this.changeData = false;
     this.addPhoto = false;

  }
   changeDataButton()
   {
     this.changeData = true;
    this.changePass = false;
     this.addPhoto = false;

   }

   addPhotoButton()
  {
     this.addPhoto = true;
     this.changePass = false;
    this.changeData = false;
  }


  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    //prikazivanje slike
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageForm.controls['PhotoPath'].setValue(event.target.result);
      this.defaultImg = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


   onSubmit(){

     if(this.passForm.get('NewPassword').value == this.passForm.get('NewRepeatedPassword').value)
     {
      const changePassword : ChangePassword  = Object.assign({}, this.passForm.value);
      this.changePassServ.postNewPass(changePassword).subscribe(
      data => {
        alert("Uspesno ste promenili lozinku!");
       },
       error => {
         alert("Niste dobro uneli Vasu staru lozinku!");
       });
     }
     else
     {
       alert("Lozinke Vam se ne podudaraju! Molimo Vas, popunite ponovo!");

     }
   }

  onSubmitData(){

    const result: EditUser = Object.assign({}, this.userForm.value);
    console.log("Usao sam, rezultat :" + result);

    this.editProfile.postDataChange(result).subscribe(
      data => {
        alert("Uspesno ste azurirali podatke!");
      },
      error => {
        alert("Doslo je do greske. Vasi podaci se nisu azurirali!");
      });
    
   
   
    // if(this.userForm.get('PassangerType').value != 'Ordinary')
    // {
    //   this.showAddPhoto = true;

    // }
    // else
    // {
    //   this.showAddPhoto = false;

    // }
  }
  onSubmitImage()
  {
    if("/assets/images/Default.gif" !=  this.imageForm.get('PhotoPath').value)
    {
      this.editProfile.postUploadPhoto(this.fileToUpload).subscribe(
        data => {
          alert("Uspesno ste dodali fotografiju!");
        },
        error => {
          alert("Doslo je do greske. Vasi podaci se nisu azurirali!");
        });
    }
  }

}
function validateDate(control: AbstractControl) : {[key: string]:any} | null{
  const dateString : string  = control.value;
  let minYear = new Date().getFullYear() - 12;
  let maxYear = new Date().getFullYear() - 100;
  let date = new Date(dateString);
  // alert(date);
  if((date.getFullYear() > minYear || date.getFullYear() < maxYear) && date != null)
  {

    return {'validateDate':true};
  }
  else
  {
    return null;
  }

}