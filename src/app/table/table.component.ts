import { Component } from '@angular/core';
import * as rawData from '../../assets/data.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  data: any = [{"name": "test", "description": "test 1", "link": "#1"}];
  // data: any = rawData;

  ngOnInit() {
    console.log('Data', this.data);
  }
}
