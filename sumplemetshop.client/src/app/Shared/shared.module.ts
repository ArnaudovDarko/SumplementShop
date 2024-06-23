import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMesssagesComponent } from './components/errors/validation-messsages/validation-messsages.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMesssagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
