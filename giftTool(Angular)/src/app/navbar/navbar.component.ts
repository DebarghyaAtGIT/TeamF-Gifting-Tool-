import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftdisplayService } from '../giftdisplay.service';
import { GiftDisplayComponent } from '../gift-display/gift-display.component';
import { GiftToolService } from '../gift-tool.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchBarContent:string="";
  showOrderHistoryButton:boolean = false;
  isLoggedIn:boolean = false;
  constructor(private _giftservice:GiftdisplayService,private router:Router,private _userService:GiftToolService,private _snackBar:MatSnackBar) {}

  public onSelect():void {

    this._giftservice.searchResult(this.searchBarContent).subscribe( data =>{
      this.processData(data);
    })
  }

  public processData(data:any[]) {

    var searchedData = JSON.stringify(data);
    window.sessionStorage.setItem("searchedResult",searchedData);
    if(window.location.pathname != '/gifts')
       this.router.navigate(['gifts']);
    else
       window.location.reload();
  }

  public onSelectOderHistory():void {
    if(localStorage.getItem('loggedUserEmail')) {
      this.router.navigate(['user',localStorage.getItem('loggedUserEmail')]);
    }
    else {

        this.router.navigate(['home']);
        this.openSnackBar('You are not logged In',"OK")

    }
  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public logOut(): void{
    var id = Number(localStorage.getItem("loggedUserId"));

    if(confirm("Are You Sure?")) {
      this._userService.logOutUser(id)
      .subscribe(
        (error: any) => {
          console.log(error);
        }
      )
      localStorage.removeItem("loggedUserId");
      localStorage.removeItem("loggedUserEmail");
      alert("You are logged out");
      window.location.reload();
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('loggedUserEmail') && localStorage.getItem('loggedUserId')) {
      this.isLoggedIn = true;
    }
    else {
     this.isLoggedIn = false;
    }
  }

}