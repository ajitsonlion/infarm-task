export interface IEvent {
  start: number;
  end: number;
}

export interface ICalendarEvent {
  name: string;
  events: IEvent[];
}

export interface IUser {
  name: string;
  color?: string;

}

export class User implements IUser {
  name: string;
  color: string;

  constructor(name: string) {
    this.name = name;
  }

}

export class UserCalendarEvent {
  user: IUser;
  events: IEvent[];

  constructor(calendarEvent: ICalendarEvent) {
    this.user = new User(calendarEvent.name);
    this.events = calendarEvent.events;
  }

}
