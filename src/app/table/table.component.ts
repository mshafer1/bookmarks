import { Component } from '@angular/core';
import * as rawData from '../../assets/data.json';
import {Datum} from "../data"
import { QueryList, ViewChildren } from '@angular/core';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../sortable-header.directive'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  data!: Array<Datum>;
  all_data!: Array<Datum>;
  filtered_data!: Array<Datum>;
  url: string = '/assets/data.json';
  
  @ViewChildren(SortableHeaderDirective)
  headers!: QueryList<SortableHeaderDirective>;

  constructor() {}

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  


    console.log(`Sorting based on: '${column}', '${direction}'`)
    // sorting countries
    if (direction === '' || column === '') {
      this.data = this.filtered_data;
    } else {
      this.data = [...this.filtered_data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

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
    this.filtered_data = temp_list;
    this.onSort({column: '', direction: ''});
  };

  ngOnInit() {
    console.log("Fetching");
    fetch(this.url).then(res => res.json())
    .then(json => {
      this.all_data = this.data = this.filtered_data = json;
      console.log('Data', this.data);
    });
  }
}
