import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CountryLineChartComponent } from "src/app/components/country-line-chart/country-line-chart.component";
import { Country } from 'src/app/models/country';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-country-detail-page',
  standalone: true,
  imports: [CountryLineChartComponent],
  templateUrl: './country-detail-page.component.html',
  styleUrl: './country-detail-page.component.scss'
})
export class CountryDetailPageComponent {
  public titlePage!: string;
  public totalEntries!: number;
  public totalMedals!: number;
  public totalAthletes!: number;
  public error!: string;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.apiService.setRefreshPage();
    
    let countryName:string|null = this.apiService.getSelectedNameCountry(this.route);

    this.apiService.getCountries().pipe(take(1)).subscribe((countryList:Country[])=>{
      if (countryList && countryList.length > 0 && this.dataService.cntExist(countryList,countryName)){
        const selectedCountry = this.dataService.getCntByName(countryList, countryName)
        this.titlePage = selectedCountry.country;
        this.totalEntries = this.dataService.getNbrParticipations(selectedCountry)
        this.totalMedals = this.dataService.getMedalsTotal(selectedCountry)
        this.totalAthletes = this.dataService.getAthletesTotal(selectedCountry)
      }
      else{
        this.apiService.navToPage('Error')
      }
    },
      (error:HttpErrorResponse) => {
        this.apiService.navToPage('Error')
        throw new Error(error.message);
      }
    )
  }

}
