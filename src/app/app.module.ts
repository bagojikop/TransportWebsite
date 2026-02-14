import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import {  RegisterComponent } from './Register/register.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { TenantsComponent } from './tenants/tenants.component';
import { TransportersComponent } from './transporters/transporters.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
        LoginComponent  ,

    TenantFormComponent,
    UserDetailsComponent,
    CompanyDetailsComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    DashboardComponent,
    SidebarComponent,
    ProfileComponent,
    TenantsComponent,
TransportersComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule ,
    ReactiveFormsModule // <-- Add this to imports array

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
