import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftToolService } from '../gift-tool.service';
import { OrderService } from '../order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userEmail: string = '';
  currentUser: any;
  orders: any;
  isAuth: boolean = false;
  id: any;
  imgurl: string =
    'https://res.cloudinary.com/anurag-cloud/image/upload/v1650605195/ang_proj_ImgEY/';

  constructor(
    private route: ActivatedRoute,
    private _userService: GiftToolService,
    private _orderService: OrderService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  //Showing order history
  getUser(email: string): void {
    this._userService.getAll(email).subscribe(
      (user: any) => {
        this.currentUser = user;
        this.isAuth = this.currentUser.isOnline;
        console.log(this.currentUser);
        if (this.isAuth) this.orderHistory(this.currentUser.pkUserId);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Getting order history
  public orderHistory(id: number): void {
    this._orderService.getOrderHistory(id).subscribe(
      (order: any) => {
        this.orders = order;

        console.log(this.orders);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Cancel already placed order
  public cancelOrder(id: number): void {
    this._orderService.deleteOrder(id).subscribe(
      (order: any) => {
        console.log(order);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.openSnackBar('Order Successfully Cancelled', 'Ok');
    this._router.navigate(['home']);
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
    if (
      !localStorage.getItem('loggedUserEmail') &&
      !localStorage.getItem('loggedUserId')
    ) {
      this._router.navigate(['home']);
      this.openSnackBar('You are not logged in', 'OK');
    } else {
      this.route.paramMap.subscribe((params) => {
        this.getUser(String(params.get('email')));
      });
    }
  }
}
