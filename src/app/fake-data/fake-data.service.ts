import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService implements InMemoryDbService {

  constructor() { }
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      tasks : [ 
        { id: 0,
          text: "Make Test Plan for New Vehicle",
          isGlobal: true,
          isLeader: true,
          creator: "Eoin Morgan",
          isCompleted: false,
          start:"2021-05-05",
          end:"2019-05-07"
        },
        { id: 1,
          text: "Make Test Items For New Vehicle",
          isGlobal: true,
          isLeader: true,
          creator: "Eoin Morgan",
          isCompleted: false,
          start:"2021-05-12",
          end:"2021-05-14"
        },
        {
          id: 2,
          text: "Create plan for tire testing",
          isGlobal: false,
          isLeader: false,
          creator: "Mithali Raj",
          isCompleted: false,
          start:"2021-05-09",
          end:"2021-05-11"
        },
        {  id: 3,
          text: "Ready the engine testing equipment",
          isGlobal: true,
          isLeader: false,
          creator: "Sheldon Cotrell",
          isCompleted: false,
          start:"2021-05-16",
          end:"2021-05-18"
        },
        {  id:4,
          text: "Test the seat components",
          isGlobal: true,
          isLeader: false,
          creator: "Ellyse Perry",
          isCompleted: false,
          start:"2021-05-18",
          end:"2021-05-20"
        },
        {  id:5,
          text: "Take the car for final examination",
          isGlobal: true,
          isLeader: false,
          creator: "Babar Azam",
          isCompleted: false,
          start:"2021-05-22",
          end:"2021-05-25"
        },
        { id:6,
          text: "Schedule Tests for engine testing",
          isGlobal: true,
          isLeader: false,
          creator: "Heather Knight",
          isCompleted: false,
          start:"2021-05-25",
          end:"2021-05-26"
        },
        { id:7,
          text: "Submit reports to committee",
          isGlobal: true,
          isLeader: false,
          creator: "Trent Boult",
          isCompleted: false,
          start:"2021-05-27",
          end:"2021-05-30"
        }
      ]
    };
  }
}
