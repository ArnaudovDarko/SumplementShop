import { Component } from '@angular/core';
import { ProteinsService } from 'src/app/core/_base/_layout/services/proteins.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  proteins: any[];

  constructor(private ProteinsService: ProteinsService,
  ) { }

ngOnInit() {

  this.getAllProteins();
}

getAllProteins()
  {
     this.ProteinsService.GetDiscountProducts().subscribe(
      res =>{
        if(res)
          {
             this.proteins = res; 
          }
      }
     );
  }
}
