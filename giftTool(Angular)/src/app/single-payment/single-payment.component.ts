import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../order-details.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-payment',
  templateUrl: './single-payment.component.html',
  styleUrls: ['./single-payment.component.css'],
})
export class SinglePaymentComponent implements OnInit {
  orderEntry: any = {
    fkUserId: Number(window.localStorage.getItem('loggedUserId')),
    recipientName: window.sessionStorage.getItem('recipientName'),
    recipientPhoneNumber: window.sessionStorage.getItem('recipientPhoneno'),
    recipientEmail: window.sessionStorage.getItem('recipientEmail'),
    fkAddressId: Number(window.sessionStorage.getItem('addressId')),
    orderCost: window.sessionStorage.getItem('giftPrice'),
    deliveryAddress: window.sessionStorage.getItem('recipientAddress'),
    orderDetails: [],
  };
  totalCost: number = Number(sessionStorage.getItem('giftPrice'));
  paymentForm: FormGroup;
  singleItem: any = null;
  username: string = String(localStorage.getItem('username'));
  useremail: string = String(localStorage.getItem('loggedUserEmail'));

  constructor(
    private _ordersService: OrderService,
    private _userService: OrderDetailsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.paymentForm = new FormGroup({
      cardnumber: new FormControl('', [Validators.required]),
      holdersname: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      expirationdate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.singleItem = JSON.parse(
      sessionStorage.getItem('GiftWithSpecificId') || ''
    );
  }

  //Place orders
  public placeOrder(): void {
    if (this.paymentForm.valid) {
      if (confirm('Payment Processsing....')) {
        this._ordersService.postOrder(this.orderEntry).subscribe((data) => {
          this._ordersService.getRecentEntry().subscribe((data: any[]) => {
            this.addOrderDetails(data);
          });
          console.log(data);
        });
      } else {
        alert('Payment Cancelled');
      }
    } else {
      this.openSnackBar('Fill the card details correctly', 'Got It');
    }
  }

  //Add order details to database
  public addOrderDetails(data:any): void{
    var newdata = JSON.parse(JSON.stringify(data));
    var orderid = Number(newdata.pkOrderId);
    alert(orderid);
    var orderDetailsEntry:any = [{
        fkOrderId: Number(orderid),
        fkGiftId: Number( window.sessionStorage.getItem("giftId")),
        giftQuantity:1,
        orderDate: new Date(),
        fkGift: null,
        fkOrder: null
      }];
      var quantityRemoved:any = { giftQuantity:1}
      this._giftService.updateQuantityValueAfterPurchase(quantityRemoved,Number( window.sessionStorage.getItem("giftId")))
      .subscribe(res=>{console.log(res)});
      this._userService.addEntry(orderDetailsEntry).subscribe(res=>{console.log(res)});
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

  public openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
