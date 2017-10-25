import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ICalendarEvent} from './models';
import {MOCK_EVENTS} from './mock';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class CalendarDataService {

  constructor(private http: HttpClient) {
  }

  getUserEvents(): Observable<ICalendarEvent[]> {

    // since it is observable could easily be exchanged with an http call
    // making it observable, separates the concern
    // component does not cares or even knows if data is real or mock
    // till it has some way to get or subscribe to that data.
    return Observable.of(MOCK_EVENTS).shareReplay();

  }

}
