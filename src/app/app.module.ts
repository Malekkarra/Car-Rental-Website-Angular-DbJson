import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FirebaseModule } from './Firebase.module';

import {MatCardModule} from '@angular/material/card';
import { LayoutComponent } from './layout/layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { NosVehiculesComponent } from './nos-vehicules/nos-vehicules.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { AProposComponent } from './apropos/apropos.component';
import { AvailableCarsDialogComponent } from './available-cars-dialog/available-cars-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AddCarDialogComponent } from './admin/add-car-dialog/add-car-dialog.component';
import { EditCarDialogComponent } from './admin/edit-car-dialog/edit-car-dialog.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { UserListDialogComponent } from './user-list-dialog/user-list-dialog.component';
import { ReservationsDialogComponent } from './admin/reservations-dialog/reservations-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    CustomSnackbarComponent,
    NosVehiculesComponent,
    ReservationPageComponent,
    AProposComponent,
    AvailableCarsDialogComponent,
    AdminComponent,
    AddCarDialogComponent,
    EditCarDialogComponent,
    ReservationListComponent,
    UserListDialogComponent,
    ReservationsDialogComponent,
    
  
   
  ],
  imports: [
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MatDialogModule,
    FirebaseModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
