import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersComponent} from './users/users.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CalendarDataService} from './calendar-data.service';
import {CalendarSandboxService} from './calendar-sandbox.service';
import {HttpClientModule} from '@angular/common/http';
import {UserComponent} from './users/user.component';
import {MatListModule} from '@angular/material';
import {TimelineComponent} from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    TimelineComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatListModule,
  ],
  providers: [CalendarSandboxService, CalendarDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
