import { Component, OnInit } from '@angular/core';
import { GiftdisplayService } from '../giftdisplay.service';
import { Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgUrl: string = "https://res.cloudinary.com/anurag-cloud/image/upload/v1650605195/ang_proj_ImgEY/";
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  category1:any[] = [];
  category2:any[] = [];
  category3:any[] = [];
  category4:any[] = [];
  recomendedGifts:any[] = [];
  constructor(private _giftservice:GiftdisplayService,private router:Router) { }


  //Categories
  ngOnInit(): void {
    this._giftservice.searchResult( "cup").subscribe( data =>{

      this.category1 = data;
    });
    this._giftservice.searchResult("flower").subscribe( data =>{

      this.category2 = data;
    });
    this._giftservice.searchResult("accessories").subscribe( data =>{

      this.category3 = data;
    });
    this._giftservice.searchResult("watch").subscribe( data =>{

      this.category4 = data;
    });

    this._giftservice.giftRecomendation(Number(localStorage.getItem("loggedUserId")))
    .subscribe(data => {

        this.storingRecomendedGifts(data);
    });
  }

  public storeRandomResult(data:any):void {
    alert("Home Page");
  }


  //Recommended products based on users' last purchases
  public storingRecomendedGifts(data:any[]):void {

      var gifts = JSON.parse(JSON.stringify(data));
      this.recomendedGifts = gifts;

      if(this.recomendedGifts.length !== 0)
         console.log(this.recomendedGifts);
      else {
        this._giftservice.showRandomResult().subscribe(data=>{
          this.recomendedGifts = data;
        });
      }
    }


//redirect to gift details page
  public onSelect(id:number):void {

      this.router.navigate(['gifts/details',id]);
  }
}
