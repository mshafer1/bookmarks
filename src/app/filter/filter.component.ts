import { Component, EventEmitter, Output } from '@angular/core';
import * as lodash from "lodash";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  debounceSetFilter = lodash.debounce((value) => {this.filterChange.emit(value)}, 300);

  setFilter(event: any) {
    this.debounceSetFilter(event.target.value)
  }
}
