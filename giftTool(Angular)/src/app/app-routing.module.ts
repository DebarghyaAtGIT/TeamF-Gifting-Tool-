import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { GiftDisplayComponent } from './gift-display/gift-display.component';
import { GiftDetailsComponent } from './gift-details/gift-details.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { PaymentComponent } from './payment/payment.component';
import { SinglePaymentComponent } from './single-payment/single-payment.component';



const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path: "login", component: LoginComponent},
  {path: "signup", component: RegistrationComponent},
  {path: "user/:email", component: UserProfileComponent},
  {path: "gifts" , component:GiftDisplayComponent},
  {path: "gifts/details/:giftid" , component:GiftDetailsComponent},
  {path: "home",component:HomeComponent},
  {path: "cart",component:CartComponent},
  {path:"customerform", component:CustomerFormComponent},
  {path:"customerform/:giftid", component:CustomerFormComponent},
  {path:"payment",component:PaymentComponent},
  {path:"singlePayment",component:SinglePaymentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,RegistrationComponent,UserProfileComponent,
GiftDisplayComponent,GiftDetailsComponent,HomeComponent,CartComponent,CustomerFormComponent,PaymentComponent,
SinglePaymentComponent];
