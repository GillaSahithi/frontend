// import { Component, HostListener } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-events',
//   standalone: true,
//   imports: [],
//   templateUrl: './events.component.html',
//   styleUrl: './events.component.css'
// })
// export class EventsComponent {
//   selectedEvent: string | null = null;

//   // Function to select an event and highlight it
//   selectEvent(eventName: string) {
//     this.selectedEvent = eventName;
//   }

//   // Listen for clicks outside the component to reset the highlight
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: Event) {
//     const targetElement = event.target as HTMLElement;
//     const isClickInside = targetElement.closest('.event-card');
//     if (!isClickInside) {
//       this.selectedEvent = null;  // Reset selection when clicked outside the events
//     }
//   }

//   // Navigate to different event details
//   navigateTo(event: string) {
//     // Implement navigation logic here (e.g., using Router)
//     console.log(`Navigating to ${event}`);
//   }

// }

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/events.service'; // Import your EventService
import { Events } from '../models/events.model'; // Import your Event model

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [], // Include necessary modules if using standalone components
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'] // Corrected to 'styleUrls'
})
export class EventsComponent implements OnInit {
  selectedEvent: string | null = null;
  events: Event[] = []; // Array to hold fetched events
  errorMessage: string | null = null; // For error handling

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents(); // Load events when the component initializes
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data; // Assign fetched data to the events array
      },
      error: (error) => {
        this.errorMessage = 'Error fetching events'; // Handle error
        console.error(error); // Log error for debugging
      },
    });
  }

  selectEvent(eventName: string) {
    this.selectedEvent = eventName;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    const isClickInside = targetElement.closest('.event-card');
    if (!isClickInside) {
      this.selectedEvent = null; // Reset selection when clicked outside
    }
  }

  navigateTo(event: string) {
    console.log(`Navigating to ${event}`); // Implement navigation logic if needed
  }
}
