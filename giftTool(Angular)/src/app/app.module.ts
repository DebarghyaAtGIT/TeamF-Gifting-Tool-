import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { GiftToolService } from './gift-tool.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderService } from './order.service';
import { GiftDisplayComponent } from './gift-display/gift-display.component';
import { GiftdisplayService } from './giftdisplay.service';
import { GiftDetailsComponent } from './gift-details/gift-details.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { PaymentComponent } from './payment/payment.component';
import { SinglePaymentComponent } from './single-payment/single-payment.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserProfileComponent,
    GiftDisplayComponent,
    GiftDetailsComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    CustomerFormComponent,
    PaymentComponent,
    SinglePaymentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [GiftToolService,OrderService,GiftdisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
