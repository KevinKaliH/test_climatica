import {Component} from '@angular/core';
import 'devextreme/data/odata/store';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent {
  dataSource: any;
  priority: any[] = [
    {name: 'High', value: 4},
    {name: 'Urgent', value: 3},
    {name: 'Normal', value: 2},
    {name: 'Low', value: 1}
  ];

  constructor(
    private http: HttpClient
  ) {
    this.getData(this.http);
  }

  getData(http: HttpClient) {
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      paginate: true,
      pageSize: 5,
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
  }
}
