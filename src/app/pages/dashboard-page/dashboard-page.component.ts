import { Component } from '@angular/core';
import { CountriesPieChartComponent } from "src/app/components/countries-pie-chart/countries-pie-chart.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CountriesPieChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
