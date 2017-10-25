import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from '../models';

@Component({
  selector: 'app-user',
  template: `<h2 [ngStyle]="{'color': user.color}">{{user.name}}</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserComponent implements OnInit {

  @Input() user: User;

  constructor() {
  }

  ngOnInit() {

  }

}
