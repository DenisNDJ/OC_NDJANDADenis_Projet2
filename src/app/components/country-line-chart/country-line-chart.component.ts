import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { take } from 'rxjs';
import { Country } from 'src/app/models/country';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-country-line-chart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-line-chart.component.html',
  styleUrl: './country-line-chart.component.scss'
})

export class CountryLineChartComponent implements OnInit{
  public error!: string;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dataService: DataService,
              private navService: NavService) {
  }

  ngOnInit() {
    this.navService.setRefreshPage();
    
    let countryName:string|null = this.apiService.getSelectedNameCountry(this.route);

    this.apiService.getCountries().pipe(take(1)).subscribe((countryList:Country[])=>{
      if (countryList && countryList.length > 0 && this.dataService.cntExist(countryList,countryName)){
        const selectedCountry = this.dataService.getCntByName(countryList, countryName)
        this.buildChart(this.dataService.getJosYears(selectedCountry), this.dataService.getMedalsPerYears(selectedCountry));
      }
      else{
        this.navService.navToPage('Error')
      }
    },
      (error:HttpErrorResponse) => {
        this.navService.navToPage('Error')
        throw new Error(error.message);
      }
    )
  }

  buildChart(years: number[], medals: string[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}