import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IUser} from '../models';

@Component({
  selector: 'app-users',
  template: `
    <md-list>
      <md-list-item *ngFor="let user of users">
        <app-user [user]="user"></app-user>
      </md-list-item>
    </md-list>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  @Input() users: IUser[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
