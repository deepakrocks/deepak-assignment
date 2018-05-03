import {Component, Input, OnInit,OnChanges,SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() itemList:Array<Item> ;
  @Input() searchItem:String ;

  sortColumns:string[] = ['Heading','Subheading','Price'];

  displayItemList : Array<Item> = [];
  isPaginationActive = false;
  watcher: Subscription;
  breakpoint :number = 0;
  pageSize :number = 0;

  constructor(
    media:ObservableMedia
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {

      if (change.mqAlias == 'xs') {
        this.breakpoint = 1;
      } else if (change.mqAlias == 'sm') {
        this.breakpoint = 2;
      }
      else if (change.mqAlias == 'md') {
        this.breakpoint = 4;
      }
      else  {
        this.breakpoint = 5;
      }
      if (this.itemList) {
        this.changePagination();
      }

    });


  }


  ngOnInit() {
    Object.assign(this.displayItemList, this.itemList);
    this.changePagination();
  }

  changePagination () {

    this.pageSize = this.breakpoint > 4 ? this.breakpoint :this.breakpoint *2;
    this.isPaginationActive = this.breakpoint <= 4;
    this.displayItemList = (this.breakpoint <= 4) ? this.itemList.slice(0, this.breakpoint * 2) : this.itemList;



  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes['itemList'] && changes['itemList'].currentValue !== changes['itemList'].previousValue && !changes['itemList'].firstChange){
      this.displayItemList = this.itemList.slice(0,this.breakpoint);
      this.changePagination();
    }

    if (changes['searchItem'] && changes['searchItem'].currentValue !== changes['searchItem'].previousValue && !changes['searchItem'].firstChange){
      this.searchItems(this.searchItem);

    }
  }


  pageEvent(pageEvnt){
    let start = pageEvnt.pageIndex *  pageEvnt.pageSize;
    let end = start + pageEvnt.pageSize;
    if (end > pageEvnt.length)
    {
      end = pageEvnt.length ;
    }
    this.displayItemList = this.itemList.slice(start,end);

  }

  searchItems(item) {
    let searchResults: Array<any> = [];
    Object.assign(searchResults, this.itemList);
    if (item && item.length > 0) {
      const allSearchValues = item.split(/[ .]/g);
      searchResults = this.itemList.filter(row => {
        let retVal = false;
        const allTermsMatch = allSearchValues.reduce((prev, term) => {
          if (!prev) {
            return false;
          }
          for (let i = 0; i < this.sortColumns.length; i++) {


            if("$".includes(String(term).substring(0,1).toLowerCase())) {
              if (term.length > 1) {
                if(String(row[this.sortColumns[i]]).toLowerCase().includes(String(term.substring(1)).toLowerCase())) {

                  return true;
                }
              } else  {
                return true;
              }

            }else {
              if (String(row[this.sortColumns[i]]).toLowerCase().includes(String(term).toLowerCase())) {
                return true;
              }
            }
          }
        }, true);
        if (allTermsMatch) {
          retVal = true;
        }
        return retVal;
      });
    }
    this.displayItemList = searchResults;
  }

  }
