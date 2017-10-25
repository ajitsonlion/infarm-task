import {ICalendarEvent} from './models';

export const MOCK_EVENTS: ICalendarEvent[] = [{
  'name': 'Zissi',
  'events': [{
    'start': 1508324400,
    'end': 1508326200
  },
    {
      'start': 1508331600,
      'end': 1508335200
    },
    {
      'start': 1508403600,
      'end': 1508407200
    }
  ]
},
  {
    'name': 'John',
    'events': [{
      'start': 1508325300,
      'end': 1508336100
    },
      {
        'start': 1508338800,
        'end': 1508340600
      }
    ]
  },
  {
    'name': 'Mislav',
    'events': [{
      'start': 1508322600,
      'end': 1508326200
    }
    ]
  },
  {
    'name': 'Ajit',
    'events': [{
      'start': 1508322600,
      'end': 1508326200
    },
      {
        'start': 1508322600,
        'end': 1508326200
      },
      {
        'start': 1508326800,
        'end': 1508329800
      },
      {
        'start': 1508328800,
        'end': 1508329800
      }
    ]
  }
];
