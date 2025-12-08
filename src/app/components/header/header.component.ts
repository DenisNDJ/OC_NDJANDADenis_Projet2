import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Country } from 'src/app/models/country';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public countries!: Country[]
  public error!:string
  titlePage: string = "Medals per Country";

  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.apiService.getCountries().pipe(take(1)).subscribe((countryList:Country[])=>{
      if (countryList && countryList.length > 0){
      this.countries = countryList
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

  onClick(country:string){
    this.apiService.navToPage('Country',country)
  }
}
