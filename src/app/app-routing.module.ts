import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NosVehiculesComponent } from './nos-vehicules/nos-vehicules.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { AProposComponent } from './apropos/apropos.component';
import { AdminComponent } from './admin/admin.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';


const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'login'
  },
  
  {
    path : 'dashboard',
    pathMatch : 'full',
    component :DashboardComponent
  },
  
  {
    path : 'login',
    pathMatch : 'full',
    component : LoginComponent
  },
  {
    path : 'nos-vehicules',
    pathMatch : 'full',
    component : NosVehiculesComponent
  },
  { path: '', component: DashboardComponent },
  
  { path: 'reservation', 
  component: ReservationPageComponent
 },
  { path: 'nos-vehicules',
   component: NosVehiculesComponent
   },
  { path: 'a-propos',
   component: AProposComponent
   },
  {
    path : 'admin',
    pathMatch : 'full',
    component :AdminComponent
  },
  { path: 'reservation-list', 
  component: ReservationListComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
