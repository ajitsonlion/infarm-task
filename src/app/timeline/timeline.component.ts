import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {IEvent, UserCalendarEvent} from '../models';
import {
  getVisTimelineBackgrounds,
  overlap,
  timelineOptions,
  transformUserEventsToVisTimelineEvents
} from './timeline-utils';
import {DataItem, DataSet, Timeline} from 'vis';


@Component({
  selector: 'app-timeline',
  template: `
    <div #timeline></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TimelineComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('timeline') vis: any;

  @Input() data: UserCalendarEvent[] = [];
  visDataItems: DataSet<DataItem>;
  timeline: Timeline;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedData: UserCalendarEvent[] = changes.data.currentValue;
    if (changedData) {
      let visDataSet: DataItem[] = transformUserEventsToVisTimelineEvents(changedData);
      for (const user of changedData) {
        const overlaps: IEvent[] = overlap(user.events);
        const visOverlapItems = getVisTimelineBackgrounds(overlaps, user.user.color);
        visDataSet = visDataSet.concat(visOverlapItems);
      }
      this.visDataItems = new DataSet(visDataSet);
      this.timeline = new Timeline(this.vis.nativeElement, this.visDataItems, timelineOptions);
    }
  }

}


