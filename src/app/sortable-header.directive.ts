// from https://github.com/inexuscore/ng-table-sort-and-filter/blob/6e23552281e8dfa8c1d9123575135ccc20ff85f6/src/app/sortable-header.directive.ts
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Datum } from './data';

export type SortColumn = keyof Datum | '';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const compare = (
  v1: string | number | boolean | Date,
  v2: string | number | boolean | Date,
  case_check: boolean = true
) => {
    if (!case_check) {
        if(typeof(v1) == 'string') {
            v1 = v1.toLocaleLowerCase()
        }
        if(typeof(v2) == 'string') {
            v2 = v2.toLocaleLowerCase()
        }
    }
    return (v1 < v2 ? -1 : v1 > v2 ? 1 : 0)
};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableHeaderDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}