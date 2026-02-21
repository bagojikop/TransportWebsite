import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RegisterComponent } from './Register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TenantsComponent } from './tenants/tenants.component';
import { TransportersComponent } from './transporters/transporters.component';
import { UsersComponent } from './users/users.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { ModuleAccessComponent } from './module-access/module-access.component';
import { TransportDashboardComponent } from './transport-dashboard/transport-dashboard.component';
import { PolicyComponent } from './policy/policy.component';
import { PaymentStatusComponent } from './phonePay/payment-status/payment-status.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tenant-form', component: TenantFormComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'company-details', component: CompanyDetailsComponent },
  { path: 'tenants', component: TenantsComponent },
  { path: 'user-register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'transport-dashboard', component: TransportDashboardComponent },
  { path: 'transport-create', component: TransportersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-creation', component: UserCreationComponent },
  { path: 'user-access', component: UserAccessComponent },
  { path: 'module-access', component: ModuleAccessComponent },
  { path: 'policy', component: PolicyComponent },
{ path: 'payment-status', component: PaymentStatusComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
