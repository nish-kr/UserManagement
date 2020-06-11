import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeDetailsService } from './service/edit-employee-details.service';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddEditEmployeeComponent,
    ViewDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EditEmployeeDetailsService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
