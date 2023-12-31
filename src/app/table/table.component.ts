import { Component, Inject } from '@angular/core';
import {Datum} from "../data"
import { QueryList, ViewChildren } from '@angular/core';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from '../sortable-header.directive'
import { DOCUMENT, LocationStrategy, Location } from '@angular/common';
import raw_data from '../../assets/data.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  data!: Array<Datum>;
  all_data!: Array<Datum>;
  filtered_data!: Array<Datum>;
  href!: string
  url: string = `assets/data.json`;
  last_sort: SortEvent =  {column:'', direction:''};
  
  @ViewChildren(SortableHeaderDirective)
  headers!: QueryList<SortableHeaderDirective>;

  // Normally, you should not access PlatformLocation directly, it's just included here for completeness.
  constructor(@Inject(DOCUMENT) private document: Document, private location: Location, private locationStrategy: LocationStrategy) { }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.last_sort = {column, direction}
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
        const res = compare(a[column], b[column], false);
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
    console.log('Updated data, now updating sort to', this.last_sort)
    this.onSort(this.last_sort);
  };

  ngOnInit() {
    console.log("Loading data");
    this.all_data = this.data = this.filtered_data = raw_data;
    console.log("Data", this.data);
  }
}
