import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NavSelect } from '../models/navigation.type';

@Injectable({
    providedIn: `root`
})

export class ApiService{

    private olympicUrl = './assets/mock/olympic.json';

    constructor(private router:Router,private http:HttpClient) {}

    /**
     * This function andle the navigation betwenn pages
     * @param navSelect the name of the target page
     * @param country the name of the selected country for country page
     */
    navToPage(navSelect:NavSelect, country:string|void){
        switch(navSelect){
            case 'Home':
                this.router.navigate(['']);
                break;
            case 'Country':
                this.router.navigate(['country/'+country])
                break;
            case 'Error':
                this.router.navigate(['not found']);
                break;
            default:
                this.router.navigate(['not found']);
        }
    }
    
    /**
     * This function sets that the components refresh with changes
     */
    setRefreshPage(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    /**
     * This is the "api" call to get the data from the Json file
     * @returns 
     */
    getCountries():Observable<Country[]>{
        return this.http.get<Country[]>(this.olympicUrl);
    }

    /**
     * this function return the name of the country in the url
     * @param route this is the actived route
     * @returns the name of the country or a null
     */
    getSelectedNameCountry(route:ActivatedRoute):string | null {
        let countryName: string | null = null
        route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
        return countryName
    }
}