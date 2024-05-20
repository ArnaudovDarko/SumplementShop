import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProteinsService {

  constructor(private http: HttpClient) {}

  getAllProteins():Observable<any[]>{
    return this.http.get<any[]>(
      environment.apiURL + "Proteins/getallproteins"
    )
  }

  GetDiscountProducts():Observable<any[]>{
    return this.http.get<any[]>(
      environment.apiURL + "Proteins/getproductsondiscount"
    )
  }
}
