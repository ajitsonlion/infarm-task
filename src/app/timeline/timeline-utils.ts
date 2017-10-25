import {DataItem, TimelineOptions} from 'vis';
import {IEvent, UserCalendarEvent} from '../models';
import randomcolor from 'randomcolor';

declare const vis: any;

export interface OverlapResults {
  overlap: boolean;
  ranges: IEvent[];
}

function doRangesOverlap(previous: IEvent, current: IEvent) {
// check for any overlap
  const previousEnd = previous.end.valueOf();
  const currentStart = current.start.valueOf();
  return (previousEnd >= currentStart);
}

function sortTimeEvents(dateRanges: IEvent[]) {
  return dateRanges.sort((previous: IEvent, current: IEvent) => {

    // get the start date from previous and current
    const previousTime = previous.start;
    const currentTime = current.start;

    // if the previous is earlier than the current
    if (previousTime < currentTime) {
      return -1;
    }

    // if the previous time is the same as the current time
    if (previousTime === currentTime) {
      return 0;
    }

    // if the previous time is later than the current time
    return 1;
  });
}

function userEventToVisEvent(r: IEvent, color: string) {
  return <DataItem>{
    start: new Date(r.start),
    end: new Date(r.end),
    type: 'background',
    style: 'background-color: ' + randomcolor({
      hue: color,
      luminosity: 'light',
      alpha: 0.1
    }) + ';'
  };
}

export function getVisTimelineBackgrounds(ranges: IEvent[], color: string): DataItem[] {

  return ranges.map((r: IEvent) => {
      return userEventToVisEvent(r, color);
    }
  );

}

// https://derickbailey.com/2015/09/07/check-for-date-range-overlap-with-javascript-arrays-sorting-and-reducing/

export function overlap(dateRanges: IEvent[]): IEvent[] {
  const sortedRanges = sortTimeEvents(dateRanges);

  const overlapResult: OverlapResults = sortedRanges.reduce((result, current, idx, arr) => {
    // get the previous range
    if (idx === 0) {
      return result;
    }
    const previous = arr[idx - 1];
    const isOverlapping = doRangesOverlap(previous, current);

    // store the result
    if (isOverlapping) {
      // yes, there is overlap
      result.overlap = true;
      // store the specific ranges that overlap
      result.ranges.push({
        end: previous.end,
        start: current.start

      });
    }

    return result;

    // seed the reduce
  }, {overlap: false, ranges: []});

  return overlapResult.overlap ? overlapResult.ranges : [];
}

export function transformUserEventsToVisTimelineEvents(userCalendarEvents: UserCalendarEvent[]) {
  const visDataSet: DataItem[] = [];
  for (const userEvents of userCalendarEvents) {
    for (const event of userEvents.events) {
      const visEvent: DataItem = {
        start: new Date(event.start),
        end: new Date(event.end),
        group: userEvents.user.name,
        style: 'background-color: ' + userEvents.user.color + '; color: #fff',
        content: userEvents.user.name
      };
      visDataSet.push(visEvent);
    }

  }

  return visDataSet;
}

export const timelineOptions: TimelineOptions = {
  width: '100%',
  height: '500px',
  zoomMax: 86400000,
  zoomMin: 10000,
  moment: function (date) {
    return vis.moment(date).utc();
  },
  tooltip: {
    followMouse: true,
    overflowMethod: 'cap'
  }
};
