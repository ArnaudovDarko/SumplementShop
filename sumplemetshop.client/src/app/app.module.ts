import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WheyProteinsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,MatTableModule,
MdbCarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }