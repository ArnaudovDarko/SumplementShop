import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messsages',
  templateUrl: './validation-messsages.component.html',
  styleUrl: './validation-messsages.component.css'
})
export class ValidationMesssagesComponent {
@Input() errorMessages:string[] | undefined;

}
