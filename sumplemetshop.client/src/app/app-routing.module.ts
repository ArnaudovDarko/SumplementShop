import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import { CartComponent } from './app/views/pages/landing-page/cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: "Home"},
  {path: 'whey-proteins', component: WheyProteinsComponent, title: "WheyProteins"},
  {path: 'cart', component: CartComponent, title: "Your Cart"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
