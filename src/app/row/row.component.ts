import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.less']
})
export class RowComponent {
  // definite assignment operator -> https://stackoverflow.com/a/60113028
  @Input() link!: string;
  @Input() name!: string;
  @Input() description!: string;
}
