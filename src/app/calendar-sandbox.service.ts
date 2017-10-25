import {Injectable} from '@angular/core';
import {CalendarDataService} from './calendar-data.service';
import 'rxjs/add/operator/skip';
import {ICalendarEvent, IEvent, IUser, UserCalendarEvent} from './models';
import {Observable} from 'rxjs/Observable';
import randomColor from 'randomcolor';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';

function handleUTCStamps(events: IEvent[]): IEvent[] {
  return events.map(e => {
    return <IEvent>{
      start: e.start * 1000,
      end: e.end * 1000
    };
  });
}

function transformEventsToUserCalendar(c: ICalendarEvent): UserCalendarEvent {
  const u: UserCalendarEvent = new UserCalendarEvent(c);
  u.user.color = randomColor({luminosity: 'dark', seed: u.user.name});
  u.events = handleUTCStamps(u.events); // since provided data is in secs, needs to be converted to millisecs
  return u;
}

// sandbox service to hide out all details from components and provide one interface to the smart component to communicate
@Injectable()
export class CalendarSandboxService {


  usersCalendar$: Observable<UserCalendarEvent[]> = this.calendarDataService.getUserEvents()
                                                        .map(this.transformToUserCalendar)
                                                        .shareReplay();
  users$ = this.usersCalendar$.map(this.extractUsers).shareReplay();

  constructor(private calendarDataService: CalendarDataService) {
  }

  private transformToUserCalendar(calendarEvents: ICalendarEvent[]): UserCalendarEvent[] {
    return calendarEvents.map(transformEventsToUserCalendar);
  }

  private extractUsers(userEvents: UserCalendarEvent[]): IUser[] {
    return userEvents.map(u => u.user);
  }
}
