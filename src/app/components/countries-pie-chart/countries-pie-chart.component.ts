import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/models/country';
import { Chart } from 'chart.js';
import { take } from 'rxjs';

@Component({
  selector: 'app-countries-pie-chart',
  standalone: true,
  templateUrl: './countries-pie-chart.component.html',
  styleUrl: './countries-pie-chart.component.scss'
})

export class CountriesPieChartComponent implements OnInit{
  public error!:string

  constructor(private router: Router,
              private apiService: ApiService,
              private dataService: DataService) { }
  
  ngOnInit() {
    this.apiService.getCountries().pipe(take(1)).subscribe((countryList:Country[])=>{
      if (countryList && countryList.length > 0){
      this.buildPieChart(this.dataService.getCntsName(countryList), this.dataService.getCntsMedals(countryList));
      }else{
        this.apiService.navToPage('Error')
      }    
    },
      (error:HttpErrorResponse) => {
        this.apiService.navToPage('Error')
        throw new Error(error.message);
      }
    )
  }

  buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
  }
}
