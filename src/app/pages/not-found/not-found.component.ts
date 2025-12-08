import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundPage implements OnInit {

  constructor(private navService: NavService) { }

    ngOnInit(): void {
      throw new Error('No data');
    }

    onClick(){
    this.navService.navToPage('Home')
  }
}
