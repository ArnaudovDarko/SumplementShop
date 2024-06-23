import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  message:string | undefined;

   constructor(private eventService:EventsService){

   }
  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next:(response:any) => this.message = response.value.message,
      error: error => console.log(error)
    }) 
  }
}
