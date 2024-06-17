import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import { CartComponent } from './app/views/pages/landing-page/cart/cart.component';
import { LogInComponent } from './app/views/pages/landing-page/log-in/log-in.component';
import { SignUpComponent } from './app/views/pages/landing-page/sign-up/sign-up.component';
import { AuthGuard } from './app/guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, title: "Home"},
  {path: 'whey-proteins', component: WheyProteinsComponent, title: "WheyProteins"},
  {path: 'cart', component: CartComponent, title: "Your Cart", canActivate:[AuthGuard]},
  {path: 'LogIn', component: LogInComponent, title: "Log In"},
  {path: 'SignUp', component: SignUpComponent, title: "SignUp"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
