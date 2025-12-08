import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CountryDetailPageComponent } from './pages/country-detail-page/country-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path : 'country/:countryName',
    component : CountryDetailPageComponent
  },

  {
    path : 'not-found',
    component : NotFoundPage
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
