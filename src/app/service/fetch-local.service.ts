import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';


@Injectable()
export class FetchLocalService {

  constructor(
    public http: HttpClient
  ) {

  }

  public itemList(){
    return this.http.get("../../assets/ItemDetails.json").toPromise();
  }
}
