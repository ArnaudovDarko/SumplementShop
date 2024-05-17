import { Component } from '@angular/core';
import { ProteinsService } from 'src/app/core/_base/_layout/services/proteins.service';
@Component({
  selector: 'app-whey-proteins',
  templateUrl: './whey-proteins.component.html',
  styleUrl: './whey-proteins.component.css'
})
export class WheyProteinsComponent {
proteins: any[];

  constructor(private ProteinsService: ProteinsService,
    ) { }

  ngOnInit() {

    this.getAllProteins();
  }


  getAllProteins()
  {
     this.ProteinsService.getAllProteins().subscribe(
      res =>{
        if(res)
          {
             this.proteins = res; 
          }
      }
     );
  }
}
