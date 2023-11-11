import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  progreso: number = 0;
  @ViewChild('tableChildren') tableChildren!: any;


  filterResults(key: string) {
    this.tableChildren.filterProducts(key)
  }
}
