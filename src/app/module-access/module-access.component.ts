import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { messageType, MsgBox } from '../services/MsgBox';
import { environment } from 'src/environments/environment';
import { Sys00203, Sys00207 } from '../Models/Users';

 
 

@Component({
  selector: 'app-module-access',
  templateUrl: './module-access.component.html',
  styleUrls: ['./module-access.component.scss']
})
export class ModuleAccessComponent implements OnInit {
  users: Sys00203[] =[] as Sys00203[];
  modules:Sys00207[]=[] as Sys00207[] 
  originalModules:Sys00207[]=[] as Sys00207[] 
  userId: number = 0;
 
customerId = this.tenantService.getTenant()?.customerId;
  constructor(private router: Router, private http: HttpClient, private tenantService: TenantService, private msgBox: MsgBox) {
  
    }
  
   
   ngOnInit(): void {
    this.http.get(`${environment.API_URL}appUser/user-list`, { params: { customerId: this.customerId } }).subscribe({
      next: (res: any) => {
        this.users = res as Sys00203[];
      }
    })
 
   }

 
  

  onUserChange(): void {
    if (this.userId) {
        this.http.get(`${environment.API_URL}AppUser/modules-by-user`,
       { params: { customerId: this.customerId,id:this.userId } }).subscribe({
         next: (res) => {
           this.modules = res as Sys00207[];
           this.originalModules=[...this.modules]
           
 
         }
       })
 
    }
  }

  getSelectedUserName(): string {
    const user = this.users.find(u => u.userId == this.userId);
    return user ? user.userLongname ||'': '';
  }

  getSelectedUserRole(): string {
    const user = this.users.find(u => u.userId == this.userId);
    return user?.isAdmin  ? 'System Administrator' : 'Standard User';
  }

  getSelectedUserInitials(): string {
    const user = this.users.find(u => u.userId == this.userId);
    if (!user) return '';
    return (user.userLongname||'').charAt(0).toUpperCase();
  }

  getGrantedCount(): number {
    return this.modules.filter(m => m.status===true).length;
  }

 
  saveModuleAccess(): void {
     this.http.post(`${environment.API_URL}AppPermission/module-auth-update`,
            this.modules,{params:{customerId:this.customerId}}).subscribe({
           next: (res) => {
            
             this.msgBox.Show(messageType.Success, 'Permissions', "Saved Successfully")
           },
           error: (err) => {
             this.msgBox.Show(messageType.Error, 'Error', err.message || err.error);
     
           }
     
         })
     
  }

  cancelChanges(): void {
    this.modules = [...this.originalModules];
    ;
  }
}