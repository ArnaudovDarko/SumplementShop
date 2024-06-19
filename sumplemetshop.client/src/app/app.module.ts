import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import { FooterComponent } from './app/views/footer/footer.component';
import { HeaderComponent } from './app/views/header/header.component';
import { CartComponent } from './app/views/pages/landing-page/cart/cart.component';
import { SignUpComponent } from './app/views/pages/landing-page/sign-up/sign-up.component';
import { LogInComponent } from './app/views/pages/landing-page/log-in/log-in.component';
import { tokenInterceptor } from './app/intercepters/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WheyProteinsComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,MatTableModule,
    MdbCarouselModule,ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: tokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
