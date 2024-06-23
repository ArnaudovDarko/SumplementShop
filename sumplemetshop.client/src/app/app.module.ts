import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import { FooterComponent } from './app/views/footer/footer.component';
import { HeaderComponent } from './app/views/header/header.component';
import { CartComponent } from './app/views/pages/landing-page/cart/cart.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMesssagesComponent } from './app/views/errors/validation-messsages/validation-messsages.component';
import { NotificationComponent } from './modals/notification/notification.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { EventsComponent } from './app/views/pages/events/events.component'
import { JwtInterceptor } from './Shared/Interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WheyProteinsComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    ValidationMesssagesComponent,
    NotificationComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,MatTableModule,
MdbCarouselModule,RouterModule,ReactiveFormsModule,ModalModule.forRoot()
  ],
  exports:[RouterModule,ReactiveFormsModule,HttpClientModule,ValidationMesssagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
