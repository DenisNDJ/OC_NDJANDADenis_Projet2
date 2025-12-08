import { Component } from '@angular/core';
import { CountryLineChartComponent } from "src/app/components/country-line-chart/country-line-chart.component";

@Component({
  selector: 'app-country-detail-page',
  standalone: true,
  imports: [CountryLineChartComponent],
  templateUrl: './country-detail-page.component.html',
  styleUrl: './country-detail-page.component.scss'
})
export class CountryDetailPageComponent {

}
