import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FilterComponent } from './filter/filter.component';
import { SortableHeaderDirective } from './sortable-header.directive';

const routes: Routes = [
  { path: '', component: TableComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterComponent,
    SortableHeaderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
