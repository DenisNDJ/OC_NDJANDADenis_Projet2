import { Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
    providedIn: `root`
})

export class DataService{

    /**
     * Verifies if the country exist
     * @param countries list of countries
     * @param nomCountry name to check
     * @returns a boolean: true if exist, false if not
     */
    cntExist(countries:Country[], nomCountry:string|null): boolean{
        const country = countries.find(_country => _country.country === nomCountry)
        if(country) return true;
        else return false;
    }

    /**
     * Return the country selected by his name
     * @param countries list of countries
     * @param nomCountry name of wanted country
     * @returns the wanted country if not found throw an error
     */
    getCntByName(countries:Country[], nomCountry:string|null):Country{
        const country = countries.find(country => country.country === nomCountry)
        if(country){
            return country;
        }
        else{
            throw new Error('Country not found!');
        }
    }

    /**
     * Return the number of country in a list
     * @param countries list of countries
     * @returns the number of countries
     */
    getCntsNbr(countries: string[]): number {
      return countries.length;
    }

    /**
     * Return the list of country names of a list of country object
     * @param listeCountries the list of country object
     * @returns the list of names 
     */
    getCntsName(listeCountries:Country[]): string[]{
        return listeCountries.map(nom =>nom.country);
    }

    /**
     * Return the total number of medals each country won
     * @param countries list of countries
     * @returns the list of total medal for each country
     */
    getCntsMedals(countries: Country[]): number[] {
        let totalMedals:number[]=[];

        countries.forEach((country, index) =>{
            totalMedals[index] = this.getMedalsTotal(countries[index])})
      
        return totalMedals;
    }

    /**
     * Return the total of medals of one country
     * @param selectedCountry the wanted country
     * @returns the total of medals of the country
     */
    getMedalsTotal(selectedCountry: Country):number {
      return selectedCountry.participations.map((_year) =>_year.medalsCount).reduce((acc: number, current: number) => acc + current, 0)
    }

    /**
     * Return a list of number,but type string, of medals won per year by a country
     * @param selectedCountry the wanted country
     * @returns the list of medals won per year
     */
    getMedalsPerYears(selectedCountry: Country):string[] {
      return selectedCountry.participations.map((_year) =>_year.medalsCount).map(String)
    }

    /**
     * Return the total number of athletes from a country
     * @param selectedCountry the wanted country
     * @returns the total number of athlete from a country
     */
    getAthletesTotal(selectedCountry: Country):number {
      return this.getAthletesPerYear(selectedCountry).reduce((acc: number, current: number) => acc + current, 0)
    }

    /**
     * Return the number of athletes from a country per JO
     * @param selectedCountry the wanted country
     * @returns the list of athlete from a country per JO
     */
    getAthletesPerYear(selectedCountry: Country):number[] {
      return selectedCountry.participations.map((_year) =>_year.athleteCount)
    }

    /**
     * Return the list of year of each JO of a country
     * @param selectedCountry the wanted country
     * @returns the list of year of each JO of the country
     */
    getJosYears(selectedCountry: Country):number[] {
      return selectedCountry.participations.map((joYear) =>joYear.year)
    }

    /**
     * Return the number of JO by checking the maximum participation of the countries
     * @param listeCountries the country list
     * @returns the number of JO
     */
    getJONbr(listeCountries:Country[]): number{
        let totalJOs:number = 0;
        listeCountries.forEach((country) =>{
            if(totalJOs < this.getNbrParticipations(country)) totalJOs = this.getNbrParticipations(country);})
        return totalJOs;
    }
    
    /**
     * Return the number of participation of a country
     * @param selectedCountry the wanted country
     * @returns the number of participation
     */
    getNbrParticipations(selectedCountry: Country):number {
      return selectedCountry.participations.length
    }
    
}