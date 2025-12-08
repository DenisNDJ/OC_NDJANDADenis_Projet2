import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavSelect } from '../models/navigation.type';

@Injectable({
    providedIn: `root`
})

export class NavService{

    constructor(private router:Router) {}

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

}