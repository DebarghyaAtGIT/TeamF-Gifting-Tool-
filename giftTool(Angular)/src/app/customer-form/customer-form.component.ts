import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  receipientForm:FormGroup;
  showpincode:string = "";
  showstate:string = "";
  showcountry:string = "";
  id:number = 0;
  items:any[] = [];
  finalcost:number = 0;
  cartlength:number = 0;

  constructor(private router:Router,private route:ActivatedRoute)
  {
    this.receipientForm = new FormGroup({
      name: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z_]+( [a-zA-Z_]+)*$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
      phoneno: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
      address: new FormControl("", [Validators.required]),
      message:new FormControl("",[Validators.required])
    });
  }
  ngOnInit(): void {
    if(window.sessionStorage.getItem("pincode") && window.sessionStorage.getItem("state") && window.sessionStorage.getItem("country")) {
      this.showpincode = String(window.sessionStorage.getItem("pincode"));
      this.showstate = String(window.sessionStorage.getItem("state"));
      this.showcountry = String(window.sessionStorage.getItem("country"));
    }
    if(this.route.snapshot.paramMap.get('giftid')) {
      this.items = JSON.parse(sessionStorage.getItem('GiftWithSpecificId')||"");
      this.finalcost = Number(sessionStorage.getItem('giftPrice'));
    }
    else {
      this.items = JSON.parse(localStorage.getItem('gifts')||"");
      this.items = this.items.filter(x=>x.userId == Number(localStorage.getItem('loggedUserId')));
      this.finalcost = Number(sessionStorage.getItem('totalCost'));
    }
    this.cartlength = this.items.length;
  }

  public onSubmit():void {

    if(this.receipientForm.valid) {
      var temp = JSON.parse(JSON.stringify(this.receipientForm.value));
      window.sessionStorage.setItem("recipientName", temp.name);
      window.sessionStorage.setItem("recipientEmail", temp.email);
      window.sessionStorage.setItem("recipientPhoneno", temp.phoneno);
      window.sessionStorage.setItem("recipientAddress", temp.address);
      window.sessionStorage.setItem("recipientMessage", temp.message);
      var id = this.route.snapshot.paramMap.get('giftid');
      if(id)
        this.router.navigate(['singlePayment']);
      else
        this.router.navigate(['payment']);
    }
    else
     alert("Invalid Form");


  }

}
