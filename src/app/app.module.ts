import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Add this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TenantFormComponent,
    UserDetailsComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // <-- Add this to imports array

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
