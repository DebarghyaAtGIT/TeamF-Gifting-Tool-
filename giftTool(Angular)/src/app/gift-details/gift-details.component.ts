import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../address.service';
import { GiftdisplayService } from '../giftdisplay.service';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.css']
})
export class GiftDetailsComponent implements OnInit {
  imgUrl: string = "https://res.cloudinary.com/anurag-cloud/image/upload/v1650605195/ang_proj_ImgEY/";
  GiftWithSpecificId:any;
  giftImage: string = "";
  giftID:number=0;
  addressForm:FormGroup;
  pinCodeNotFound:boolean = false;
  deliverablePincode:boolean = false;
  selectedGift:any = null;
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
  panelOpenState = false;
  panelOpenState2 = false;
  productName:string = "";
  productCost:string = "";
  productCategory:string = "";
  moreproducts:any = null;
  quantityAvailable:number = 0;




  constructor( private viewport:ViewportScroller,private _giftservice:GiftdisplayService,private route:ActivatedRoute,private _addressService:AddressService,private router:Router,private _snackBar:MatSnackBar) {
    this.addressForm = new FormGroup({
      pincode: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")])
    });
  }

  ngOnInit(): void {
    this.viewport.scrollToPosition([0,0]);
    var id = this.route.snapshot.paramMap.get('giftid');
    this.giftID = Number(id);
    this._giftservice.showSpecificGift(this.giftID).subscribe( data =>{
      var temp = JSON.parse(JSON.stringify(data));
      console.log(temp);
      this.productName = temp[0].giftName;
      this.productCost = temp[0].price;
      this.productCategory = temp[0].categoryName;
      this.quantityAvailable = temp[0].giftQuantity;
      sessionStorage.setItem('GiftWithSpecificId',JSON.stringify(data));
      this.GiftWithSpecificId = JSON.parse(Object(sessionStorage.getItem('GiftWithSpecificId')));;
      this.giftImage = this.GiftWithSpecificId[0].giftImage
    });
    this._giftservice.showOtherProducts(this.giftID).subscribe(data=> {
        this.moreproducts = data;
        console.log(this.moreproducts);
    });

  }

//Alert
public openSnackBar(message: string, action: string):void {
  this._snackBar.open(message, action, {
    duration: 5000,
  });
}


  //Validating Pincode
  public onSubmit():void {
    if(localStorage.getItem('loggedUserId')) {
      if(this.quantityAvailable>30) {
        if(this.addressForm.valid) {
          this._addressService.get(this.addressForm.controls['pincode'].value)
          .subscribe((data:any[])=> {
            this.storePincodeFunction(data);
          });
        }
        else {
          this.openSnackBar('Enter pincode to proceed further',"OK");
        }
      }
      else
      {
        this.openSnackBar('Item is already out of stock',"GOT IT");
      }
   }
   else {
    this.openSnackBar('You are not logged in',"OK");
   }
  }


  //Checking if given pincode is deliverable or not
  public storePincodeFunction(data:any[]):void {

      this.selectedGift = JSON.parse(Object(sessionStorage.getItem('GiftWithSpecificId')));

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
        window.sessionStorage.setItem("giftId",String(this.giftID));
        window.sessionStorage.setItem("giftPrice",this.selectedGift[0].price);

        this.router.navigate(['customerform',this.giftID]);
      }

  }


  //Add items to cart only iif user is logged in
  public addCart():void {

    this.selectedGift = JSON.parse(Object(sessionStorage.getItem('GiftWithSpecificId')));

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
            this.cartItems.giftId = Number(this.selectedGift[0].giftId);
            this.cartItems.giftName = this.selectedGift[0].giftName;
            this.cartItems.price = Number(this.selectedGift[0].price);
            this.cartItems.giftImg= this.selectedGift[0].giftImage;
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
      this.openSnackBar('You are not logged in',"OK");
    }
  }

}
