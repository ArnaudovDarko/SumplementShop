import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn:"root"
})

export class EventsService{
    /**
     *
     */
    constructor(private http:HttpClient) {

    }

    getEvents():Observable<any[]>{
        return this.http.get<any[]>(
          environment.apiURL + "events/getallevents"
        )
      }
}