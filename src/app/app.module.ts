import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule,MatSelectModule} from '@angular/material'
import {  MatGridListModule } from '@angular/material/grid-list'
import { FlexLayoutModule } from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {  MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatDividerModule} from "@angular/material/divider";

import {rootRouter} from "./app.routes";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import {FetchLocalService} from "./service/fetch-local.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataGridComponent,
    ItemCardComponent
  ],
  imports: [
    RouterModule.forRoot(rootRouter, { useHash: false }),
    BrowserModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule

  ],
  providers: [FetchLocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
