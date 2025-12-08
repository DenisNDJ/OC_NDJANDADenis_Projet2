import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundPage implements OnInit {

  constructor(private apiService:ApiService) { }

    ngOnInit(): void {
      throw new Error('No data');
    }

    onClick(){
    this.apiService.navToPage('Home')
  }
}
