import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FetchLocalService} from "../service/fetch-local.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public itemList : Array<Item>;
  public searchItem : FormControl ;
  public searchForm: FormGroup;

  constructor(
    public fetchLocalService : FetchLocalService
  ) {
    this.itemList = [];
  }

  ngOnInit() {

    this.fetchLocalService.itemList()
      .then(itemListResponse => this.itemListSuccess(itemListResponse))
      .catch(error => this.itemListErrorHandler(error));

    this.searchForm = new FormGroup({
      searchItem: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z0-9]+$')
      ]))
    });

  }

  itemListSuccess (itemListResponse) {
    this.itemList =  itemListResponse;

    this.itemList.forEach(item => {

      if (item.Price === 25000 || item.Price === 23000) {
        item.mainimage = "assets/wide_ggbridge_bg_teneax.jpg";
        item.overlayimage = ""
      } else{
        item.mainimage = "assets/darktiles_bg_gike55.jpg";
        item.overlayimage = "assets/place_holder_zuvywg.png"

      }


    } );



  }

  itemListErrorHandler (error) {
    this.itemList = [];
  }

}
