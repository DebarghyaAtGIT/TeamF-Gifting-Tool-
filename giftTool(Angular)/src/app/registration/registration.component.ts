import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { GiftToolService } from '../gift-tool.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  signUpForm:FormGroup;
  showError:boolean = false;
  emailid:string = "";
  Users:User[] = [];
  isValid:Boolean = false;
  constructor(private _registrationservice:GiftToolService,private router:Router,private _snackBar:MatSnackBar) {
    this.signUpForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_]+( [a-zA-Z_]+)*$")]),
        email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
        pass: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        cpass: new FormControl("", [Validators.required,Validators.minLength(6), Validators.maxLength(15)]),
        checkBox: new FormControl("", [Validators.required])
    });
  }

  public onSubmit():void {

    if(this.signUpForm.controls['pass'].value == this.signUpForm.controls['cpass'].value) {
      this.isValid = true;
    }

    if(!this.signUpForm.controls['checkBox'].dirty)
      this.isValid = false;

    this.emailid = this.signUpForm.controls['email'].value;

    if(this.signUpForm.valid && this.isValid) {
      this._registrationservice.getAll(this.emailid)
      .subscribe((data:User[])=> {
        this.getRequiredData(data);
      });
    }

    if(!this.signUpForm.valid && !this.isValid)
      alert("This is not a valid form");
  }

  public getRequiredData(data:User[]) {
     this.Users = data;
     if(this.Users != undefined && Object.keys(this.Users).length>0 ) {
      this.showError = true;
      this.isValid = false;
    }
    else {
       this.showError = false;
       this.isValid = true;
    }

    if(this.signUpForm.valid && this.isValid &&
      (this.signUpForm.controls['pass'].value == this.signUpForm.controls['cpass'].value))
      {
        var newUser:any = {
        fullName:this.signUpForm.controls['name'].value,
        email:this.signUpForm.controls['email'].value,
        password:this.signUpForm.controls['cpass'].value,
        isOnline:false
        };
        this._registrationservice.addUser(newUser).subscribe(data => {
          this._registrationservice.getLoggedUser(data).subscribe(res => {

            this.processData(res);
          },
          err => {
            console.log(err);
          })
        });



      }
    else
      alert("This is not a valid form");
  }

  public processData(data:any):void {
    this.openSnackBar("Registration Successful", "OK")
    var res = JSON.parse(JSON.stringify(data));
    console.log(res);
    if(res!=null) {
        localStorage.setItem("loggedUserId", res.pkUserId);
        localStorage.setItem("loggedUserEmail", res.email);
        localStorage.setItem("username",res.fullName);

        this.openSnackBar(("You are logged in : " + res.email),"OK")
        this.router.navigate(['home']);
    }
  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
