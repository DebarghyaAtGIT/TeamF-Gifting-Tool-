import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderDetailsService } from '../order-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cartItems:any[]=[];
  items:any[] = [];
  orderEntry:any = {
    fkUserId:Number(window.localStorage.getItem("loggedUserId")),
    recipientName: window.sessionStorage.getItem("recipientName"),
    recipientPhoneNumber: window.sessionStorage.getItem("recipientPhoneno"),
    recipientEmail: window.sessionStorage.getItem("recipientEmail"),
    fkAddressId: Number(window.sessionStorage.getItem("addressId")),
    orderCost: window.sessionStorage.getItem("totalCost"),
    deliveryAddress: window.sessionStorage.getItem("recipientAddress"),

    orderDetails: []
  };
  totalCost:number = Number(sessionStorage.getItem('totalCost'));
  paymentForm:FormGroup;
  constructor(private _ordersService:OrderService,private _userService:OrderDetailsService,private _snackBar:MatSnackBar,private router:Router) {
     this.paymentForm = new FormGroup ( {
      cardnumber: new FormControl("", [Validators.required]),
      holdersname: new FormControl("", [Validators.required]),
      startdate:new FormControl("", [Validators.required]),
      expirationdate:new FormControl("", [Validators.required]),
      cvv:new FormControl("", [Validators.required])
    });
  }
  username:string = String(localStorage.getItem('username'));
  useremail:string = String(localStorage.getItem('loggedUserEmail'));
  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem("gifts") || "");
    this.cartItems = this.cartItems.filter(x=>x.userId == Number(localStorage.getItem('loggedUserId')));

  }

  public placeOrder(): void{
    if(this.paymentForm.valid) {
      if(confirm("Payment Processsing....")) {
        this._ordersService.postOrder(this.orderEntry).subscribe(data =>{
            this._ordersService.getRecentEntry().subscribe((data:any[])=> {
              this.addOrderDetails(data);
            });
            console.log(data)
        });
      }
      else {
        alert("Payment Cancelled");
      }
    }
    else {
      this.openSnackBar("Fill the card details correctly","Got It")
    }

  }

  public addOrderDetails(data:any): void{
    var newdata = JSON.parse(JSON.stringify(data));
    var orderid = Number(newdata.pkOrderId);
    alert(orderid);
    for(let i in this.cartItems){

      var orderDetailsEntry:any = [{
        fkOrderId: Number(orderid),
        fkGiftId: Number(this.cartItems[i].giftId),
        giftQuantity:Number(this.cartItems[i].quantityOfGifts),
        orderDate: new Date(),
        fkGift: null,
        fkOrder: null }];
        this._userService.addEntry(orderDetailsEntry).subscribe(res=>{console.log(res)})
        this.items = JSON.parse(localStorage.getItem('gifts')||"");
        this.items.forEach((element,index) => {
            if(element.userId == Number(localStorage.getItem('loggedUserId'))) {
              this.items.splice(index,1);
            }
        });
        localStorage.setItem('gifts',JSON.stringify(this.items));
        window.sessionStorage.removeItem("recipientName");
      window.sessionStorage.removeItem("recipientPhoneno");
      window.sessionStorage.removeItem("recipientEmail");
      window.sessionStorage.removeItem("addressId");
      window.sessionStorage.removeItem("giftPrice");
      window.sessionStorage.removeItem("recipientAddress");
      window.sessionStorage.removeItem("giftId");
      this.openSnackBar("Thank You for shopping with us..", "OK")
      this.router.navigate(['home']);
    }
  }

  public openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }



}
