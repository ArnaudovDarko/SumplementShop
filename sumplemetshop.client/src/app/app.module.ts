import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WheyProteinsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
