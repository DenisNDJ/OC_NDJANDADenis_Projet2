import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Injectable({
    providedIn: `root`
})

export class ApiService{

    private olympicUrl = './assets/mock/olympic.json';

    constructor(private http:HttpClient) {}

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