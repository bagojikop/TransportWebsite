import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tenant-form', component:TenantFormComponent},
  { path: 'user-details', component:UserDetailsComponent},
  { path:'company-details', component:CompanyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
