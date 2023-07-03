import { Component, EventEmitter, Output } from '@angular/core';
import * as lodash from "lodash";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<object>();
  filterValue!: string

  debounceSetFilter = lodash.debounce((value) => {
    let emitData = {
      value: value,
    }
    this.filterChange.emit(emitData)
  }, 300);

  setFilter(event: any) {
    this.debounceSetFilter(event.target.value)
  }

  clearFilter() {
    console.log("Clearing filter");
    this.filterValue = "";
    this.debounceSetFilter(this.filterValue);
  }
}
