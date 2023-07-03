import { Component } from '@angular/core';
import * as rawData from '../../assets/data.json';
import {Datum} from "../data"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  data!: Array<Datum>;
  all_data!: Array<Datum>;
  url: string = '/assets/data.json';

  constructor() {}

  checkItem(item: Datum, search: string, caseCheck: boolean) {
    if (!caseCheck) {
      search = search.toLowerCase();
    }

    if (caseCheck && item.name.includes(search)) {
      return true
    }
    if (!caseCheck && item.name.toLowerCase().includes(search)) {
      return true
    }

    if (caseCheck && item.description.includes(search)) {
      return true;
    }
    if (!caseCheck && item.description.toLowerCase().includes(search)) {
      return true;
    }

    return false;
  }

  setFilter(event: any) {
    var value = event.value;
    console.log("Setting filter to", value)
    var temp_list: Array<Datum> = [];
    var case_check = value.toLocaleLowerCase() != value
    this.all_data.forEach(element => {
      if (this.checkItem(element, value, case_check)) {
        temp_list.push(element)
      }
    });
    this.data = temp_list;
  };

  ngOnInit() {
    console.log("Fetching");
    fetch(this.url).then(res => res.json())
    .then(json => {
      this.all_data = this.data = json;
      console.log('Data', this.data);
    });
  }
}
