import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/views/pages/landing-page/home/home.component';
import { WheyProteinsComponent } from './app/views/pages/landing-page/whey-proteins/whey-proteins.component';
import { CartComponent } from './app/views/pages/landing-page/cart/cart.component';
import { NotFoundComponent } from './app/views/errors/not-found/not-found.component';
import { EventsComponent } from './app/views/pages/events/events.component';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, title: "Home"},
  {path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule)},
  {path: 'whey-proteins', component: WheyProteinsComponent, title: "WheyProteins"},
  {path: 'cart', component: CartComponent, title: "Your Cart"},
  {path: 'Not Found', component: NotFoundComponent, title: "Not Found"},
  // {path: 'Events', component: EventsComponent, title: "Events"},
  {
    path:'',
    runGuardsAndResolvers:"always",
    canActivate:[AuthorizationGuard],
    children:[
      {path:'Events', component:EventsComponent}
    ]
  },
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
