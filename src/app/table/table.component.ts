import { Component } from '@angular/core';
import * as rawData from '../../assets/data.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  data: any;
  url: string = '/assets/data.json';

  constructor() {}

  ngOnInit() {
    console.log("Fetching");
    fetch(this.url).then(res => res.json())
    .then(json => {
      this.data = json;
      console.log('Data', this.data);
    });
  }
}
