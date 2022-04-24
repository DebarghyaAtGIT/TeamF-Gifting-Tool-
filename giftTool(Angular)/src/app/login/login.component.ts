import { Component, OnInit } from '@angular/core';
import { GiftToolService } from '../gift-tool.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  userId:any = 0;
  userEmail:string = "";
  isAuth:boolean = false;
  id: any;


  constructor(private _userService:GiftToolService,private router:Router,private _snackBar:MatSnackBar) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
    pass: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    // auth: new FormControl()
  })

  authUser(): void{
    const data = {
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["pass"].value,
      // isAuth: true
    }
    this._userService.getLoggedUser(data).subscribe(res => {
      this.processData(res);
    },
    err => {
      console.log(err);
    })
  }

  public processData(data:any):void {
    var res = JSON.parse(JSON.stringify(data));
    console.log(res);
    if(res!=null) {
        localStorage.setItem("loggedUserId", res.pkUserId);
        localStorage.setItem("loggedUserEmail", res.email);
        localStorage.setItem("username",res.fullName);

        this.userId =  localStorage.getItem("loggedUserId");
        this.userEmail = res.email;
        this.isAuth = res.isOnline;
        console.log(res);

        this.openSnackBar(("You are logged in : " + res.email),"OK")
        this.router.navigate(['home']);
    }
    else {
      this.isAuth = false;
    }

    if(!this.isAuth)
      this.openSnackBar("Invalid Credentials","Got It")

  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


  ngOnInit(): void {
    if(localStorage.getItem('loggedUserId')) {
      this.router.navigate(['home']);
      this.openSnackBar("You are already Logged In","OK");
    }
  }

}

