import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalendarSandboxService} from './calendar-sandbox.service';
import {UserCalendarEvent} from './models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {

  usersCalendar$: Observable<UserCalendarEvent[]> = this.sandbox.usersCalendar$.shareReplay();
  users$ = this.sandbox.users$;

  constructor(private sandbox: CalendarSandboxService) {

  }
}
