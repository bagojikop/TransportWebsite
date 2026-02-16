import { Component, OnInit } from '@angular/core';
import { Sys00204 } from '../Models/Users';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TenantService } from '../services/tenant.service';
import { environment } from 'src/environments/environment';
import { messageType, MsgBox } from '../services/MsgBox';



@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent {
  constructor(private router: Router, private http: HttpClient, private tenantService: TenantService, private msgBox: MsgBox) {

  }

  users: Sys00204[] = [];
  filteredUsers: Sys00204[] = [];
  originalUsers: Sys00204[] = [];
  searchTerm: string = '';
  hasChanges: boolean = false;
  customerId = this.tenantService.getTenant()?.customerId;
  ngOnInit(): void {
    this.http.get(`${environment.API_URL}AppPermission/users-auth-list`,
      { params: { customerId: this.customerId } }).subscribe({
        next: (res) => {
          this.users = res as Sys00204[]
          this.originalUsers = JSON.parse(JSON.stringify(this.users));
          this.filteredUsers = [...this.users];

        }
      })


  }

  getUserInitials(fullName: string): string {
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterUsers();
  }

  filterUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.user.userLongname!.toLowerCase().includes(term) ||
      user.user.userName!.toLowerCase().includes(term) ||
      user.user.emailId!.toLowerCase().includes(term)
    );
  }

  updatePermissions(user: Sys00204): void {
    this.hasChanges = true;
  }

  savePermissions(): void {
    this.http.post(`${environment.API_URL}AppPermission/users-auth-update`,
       this.filteredUsers,{params:{customerId:this.customerId}}).subscribe({
      next: (res) => {
        this.users = res as Sys00204[];
        this.originalUsers = JSON.parse(JSON.stringify(this.users));
        this.hasChanges = false;
        this.msgBox.Show(messageType.Success, 'Permissions', "Saved Successfully")
      },
      error: (err) => {
        this.msgBox.Show(messageType.Error, 'Error', err.message || err.error);

      }

    })

  }

  cancelChanges(): void {
    this.users = JSON.parse(JSON.stringify(this.originalUsers));
    this.filterUsers();
    this.hasChanges = false;

  }
}