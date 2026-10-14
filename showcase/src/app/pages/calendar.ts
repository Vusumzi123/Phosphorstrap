import { Component } from '@angular/core';

import { CalendarComponent } from '../calendar';

@Component({
  selector: 'app-calendar-page',
  imports: [CalendarComponent],
  templateUrl: './calendar.html',
})
export class CalendarPage {}
