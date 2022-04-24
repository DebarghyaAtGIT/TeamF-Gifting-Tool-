import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  imgUrl: string = "https://res.cloudinary.com/anurag-cloud/image/upload/v1650605195/ang_proj_ImgEY/";
  items:any[]= [];
  totalCost:number = 0;
  addressForm:FormGroup;
  pinCodeNotFound:boolean = false;
  isCartEmpty:boolean = true;


  deliverablePincode:boolean = false;
  constructor(private router:Router,private _snackBar:MatSnackBar,private _addressService:AddressService) {
    this.addressForm = new FormGroup({
      pincode: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")])
    });
  }
  ngOnInit(): void {
    if(!localStorage.getItem('loggedUserId')) {
      this.router.navigate(['home']);
      this.openSnackBar('You are not logged In',"OK")
    }
    this.totalCost = 0;
    if(localStorage.getItem('gifts')) {
       this.items = JSON.parse(localStorage.getItem('gifts')||"");
       this.items = this.items.filter(x=>x.userId == Number(localStorage.getItem('loggedUserId')));
    }
    if(this.items.length>0) {
       console.log(this.items);
       this.calculateTotalCost();
       this.isCartEmpty = false;
    }
    else {
      this.isCartEmpty = true;
    }
  }

  public calculateTotalCost():void {
    this.totalCost = 0;
    this.items.forEach((element:any) => {
      this.totalCost += element.orderCost;
    });
    sessionStorage.setItem('totalCost',String(this.totalCost));
  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public onSelect(id:number):void {
    this.router.navigate(['gifts/details',id]);
  }

  public onSubmit():void {

    if(!this.isCartEmpty) {
      if(this.addressForm.valid) {
        this._addressService.get(this.addressForm.controls['pincode'].value)
        .subscribe((data:any[])=> {
          this.storePincodeFunction(data);
        });
      }
      else {
        this.openSnackBar('Pincode cannot be null or any alphabet ',"OK")
      }
    }
    else {


        this.openSnackBar('Your Cart is Empty',"OK")

    }
  }

  public storePincodeFunction(data:any[]):void {



      var storePincode = JSON.parse(JSON.stringify(data));
      if(data == null) {
        this.pinCodeNotFound = true;

      }
      else
        this.pinCodeNotFound = false;


      if(this.addressForm.valid && !this.pinCodeNotFound)
        this.deliverablePincode = true;
      else
        this.deliverablePincode = false;


      if(this.deliverablePincode) {
        window.sessionStorage.setItem("addressId", storePincode.pkAddressId);
        window.sessionStorage.setItem("pincode", storePincode.pincode);
        window.sessionStorage.setItem("state", storePincode.state);
        window.sessionStorage.setItem("country", storePincode.country);

        this.router.navigate(['customerform']);
      }

  }

  public onDecrement(giftID:number):void {
    var item = this.items.find(x=>x.giftId == giftID);
    let index = this.items.indexOf(item);
    if (localStorage.getItem('loggedUserId')) {
      var ls = JSON.parse(localStorage.getItem('gifts') || '[]');
      let exist:any;
      if (ls) {
        exist = ls.find((item: any) => {

          return (item.giftId == giftID
            && item.userId == Number(localStorage.getItem('loggedUserId')));
        });
        if (exist) {
          if(exist.quantityOfGifts>1) {
            exist.quantityOfGifts -= 1;
            exist.orderCost = exist.quantityOfGifts * exist.price;
            item.quantityOfGifts = exist.quantityOfGifts;
            item.orderCost = exist.orderCost;
            this.items[index] = item;
            this.calculateTotalCost();
            localStorage.setItem('gifts', JSON.stringify(ls));
            this.openSnackBar(('Quantity Reduced'),"OK");
          }
          else {
            this.openSnackBar(('Quantity cannot be less than 1. Please remove the item from your cart if you don\'t want to purchase'),"OK");
          }
        }
      }

    }
    else {
      this.openSnackBar("You are not logged in","OK");
    }
  }

  public onIncrement(giftID:number):void {
    var item = this.items.find(x=>x.giftId == giftID);
    let index = this.items.indexOf(item);
    if (localStorage.getItem('loggedUserId')) {
      var ls = JSON.parse(localStorage.getItem('gifts') || '[]');
      let exist:any;
      if (ls) {
        exist = ls.find((item: any) => {

          return (item.giftId == giftID
            && item.userId == Number(localStorage.getItem('loggedUserId')));
        });
        if (exist) {
          exist.quantityOfGifts += 1;
          exist.orderCost = exist.quantityOfGifts * exist.price;
          item.quantityOfGifts = exist.quantityOfGifts;
          item.orderCost = exist.orderCost;
          this.items[index] = item;
          this.calculateTotalCost();
          localStorage.setItem('gifts', JSON.stringify(ls));
          this.openSnackBar(('Quantity Increased'),"OK");
        }
      }

    }
    else {
      this.openSnackBar("You are not logged in","OK");
    }
  }

  public removeItemFromCart(giftID:number):void {
     var itemList:any[] = JSON.parse(localStorage.getItem('gifts')||"");
     var element = itemList.find(x=>(x.giftId == giftID && x.userId == Number(localStorage.getItem('loggedUserId'))));
     let index = itemList.indexOf(element);
     itemList.splice(index,1);
     localStorage.setItem('gifts',JSON.stringify(itemList));
     this.openSnackBar(("Item: " + element.giftName + " has been removed from cart"),"OK");
     this.ngOnInit();
    }
}
