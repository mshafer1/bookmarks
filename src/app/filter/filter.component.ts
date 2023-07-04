import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as lodash from "lodash";
import { Location } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<object>();
  filterValue!: string
  currentFilter!: string

  constructor(private route: ActivatedRoute, private location: Location) { }

  debounceSetFilter = lodash.debounce((value) => {
    if (value != this.currentFilter) {
      if(value.length > 0){
        history.pushState({}, '', `?q=${value}`)
      } else {
        history.pushState({}, '', `?`)
      }
    }
    let emitData = {
      value: value,
    }
    this.currentFilter = value;
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

  ngOnInit() {
    this.route.queryParams.pipe(
    filter(params => params['q'])
    ).subscribe(params => {
      console.log(params); // { category: "fiction" }
      this.currentFilter = this.filterValue = params['q'];
      console.log("Setting filter to", this.filterValue); // fiction
      this.debounceSetFilter(this.filterValue);
    })

    this.location.subscribe((value) =>{
      console.log("went back", value, this.filterValue, this.currentFilter);
      var parts = value.url?.split("?", 1)
      var query = ''
      if(typeof(parts)=='undefined' || parts.length < 2) {
      }
      else {
        var queryString: string = parts.slice(-1)[0];
        var urlParams = new URLSearchParams(queryString);
        query = (urlParams.get('q') || '')
      }

      this.currentFilter = this.filterValue = query
      console.log("Setting filter to", this.filterValue); // fiction
      this.debounceSetFilter(this.filterValue);
    })
  }
}
