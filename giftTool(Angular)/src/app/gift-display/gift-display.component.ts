import { Component, OnInit } from '@angular/core';
import { GiftdisplayService } from '../giftdisplay.service';
import { routingComponents } from '../app-routing.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gift-display',
  templateUrl: './gift-display.component.html',
  styleUrls: ['./gift-display.component.css']
})
export class GiftDisplayComponent implements OnInit {
 imgUrl: string = "https://res.cloudinary.com/anurag-cloud/image/upload/v1650605195/ang_proj_ImgEY/";
  Gifts:any[]=[];
  selectedGift:any[] = [];
  array:any[] = [];
  cartItems: any = {
    giftId:0,
    quantityOfGifts:1,
    giftName:"",
    price:"",
    giftImg:"",
    giftCategory:"",
    userId:0,
    orderCost:0
  };
  constructor(private _giftservice:GiftdisplayService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {


      var temp = String(window.sessionStorage.getItem("searchedResult"));
      this.Gifts = JSON.parse(temp);
      this.array = JSON.parse(String(window.sessionStorage.getItem('searchedResult')));
    }

  public onSelect(giftid:any):void {
    this.router.navigate(['gifts/details',Number(giftid)]);
  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public addCart(giftid:any):void {
    this.selectedGift = this.array.filter(x=>x.giftId == Number(giftid));
    if (localStorage.getItem('loggedUserId')) {
      var ls = JSON.parse(localStorage.getItem('gifts') || '[]');
      let exist:any;
      if (ls) {
        exist = ls.find((item: any) => {

          return (item.giftId == this.selectedGift[0].giftId
            && item.userId == Number(localStorage.getItem('loggedUserId')));
        });
        if (exist) {
          exist.quantityOfGifts += 1;
          exist.orderCost = exist.quantityOfGifts * exist.price;
          localStorage.setItem('gifts', JSON.stringify(ls));
          this.openSnackBar(('Items added to Cart x ' + exist.quantityOfGifts),"OK");
        } else {
          if (ls) {
            this.cartItems.giftId = this.selectedGift[0].giftId;
            this.cartItems.giftName = this.selectedGift[0].name;
            this.cartItems.price = Number(this.selectedGift[0].price);
            this.cartItems.giftImg= this.selectedGift[0].image;
            this.cartItems.giftCategory = this.selectedGift[0].categoryName;
            this.cartItems.userId = Number(localStorage.getItem('loggedUserId'));
            this.cartItems.orderCost = Number(this.selectedGift[0].price);

            const newData = [...ls,this.cartItems];

            localStorage.setItem('gifts', JSON.stringify(newData));
            this.openSnackBar('Items added to Cart',"OK");
          }
        }
      }
    }
    else
    {
      alert('You are not logged in');
    }
  }

}
