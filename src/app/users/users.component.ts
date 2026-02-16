import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sys00203 } from '../Models/Users';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TenantService } from '../services/tenant.service';
import { messageType, MsgBox } from '../services/MsgBox';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private router: Router, private http: HttpClient,
    private tenantService: TenantService,
    private msgBox: MsgBox
  ) {


  }
  users = [] as Sys00203[];
  private customerId = this.tenantService.getTenant()?.customerId;

  ngOnInit() {

    this.http.get(`${environment.API_URL}appUser/user-list`, { params: { customerId: this.customerId } }).subscribe({
      next: (res: any) => {
        this.users = res;
      }
    })

  }
  edit(id:number)
  {
     this.router.navigate(["/user-creation"],{state:{id:id}})
  }

  delete(id: number) {
    this.msgBox.Show(
      messageType.DeleteConfirm,
      "Confirmation",
      "Are you sure,do you want to delete ?"
    ).then(res => {
      if (res.isConfirmed)

        this.http.delete(`${environment.API_URL}appUser/delete`, { params: { customerId: this.customerId, userid: id } }).subscribe({
          next: (res) => {
            var idx = this.users.findIndex(x => x.userId === id);
            this.users.splice(0, idx)
          }
        })
    })
  }
  // Method to navigate to user creation page
  navigateToUserCreation(): void {
    this.router.navigate(['/user-creation']);
  }
}