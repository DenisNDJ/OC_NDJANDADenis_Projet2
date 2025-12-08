import { Component, OnInit } from '@angular/core';
import { CountriesPieChartComponent } from "src/app/components/countries-pie-chart/countries-pie-chart.component";
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/models/country';
import { take } from 'rxjs';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CountriesPieChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit{
  
  public totalCountries!: number
  public totalJOs!: number
  titlePage: string = "Medals per Country";

  constructor(private apiService: ApiService,
              private dataService: DataService,
              private navService: NavService) { }
  
  ngOnInit() {
    this.apiService.getCountries().pipe(take(1)).subscribe((countryList:Country[])=>{
      if (countryList && countryList.length > 0){
      this.totalJOs = this.dataService.getJONbr(countryList);
      this.totalCountries = this.dataService.getCntsNbr(this.dataService.getCntsName(countryList))
      
      }else{
        this.navService.navToPage('Error')
      }    
    },
      (error:HttpErrorResponse) => {
        this.navService.navToPage('Error')
        throw new Error(error.message);
      }
    )
  }
}
