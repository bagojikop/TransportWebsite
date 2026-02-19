import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public entity: any = {};
  public isEditing: boolean = false;
  public isSaving: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.entity = this.authService.getUser();
  }

save(){
   this.http.post(`${environment.API_URL}register/update`,this.entity).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.authService.setUser(res);
        this.isEditing=false;
      },
      error: (err) => {
        this.isLoading = false;
      }

    });

}
  toggleEdit(): void {

    this.isEditing = !this.isEditing;

  }


  getInitials(): string {

    if (!this.entity?.customerName) return '';

    return this.entity.customerName.charAt(0).toUpperCase();

  }


  saveProfile(): void {

    if (!this.entity.customerId) return;

    this.isSaving = true;

    const payload = {

      customerId: this.entity.customerId,
      customerName: this.entity.name,
      email: this.entity.email,
      phone: this.entity.phone,
      address: this.entity.address,
      gstin: this.entity.gstin

    };

    console.log("Calling tenant-save API:", payload);

    this.http.post(`${environment.API_URL}tenant-save`, payload)

      .subscribe({

        next: (res: any) => {

          console.log("Save success:", res);

          this.entity = {
            customerId: res.customerId,
            name: res.customerName,
            email: res.email,
            phone: res.phone,
            address: res.address,
            gstin: res.gstin
          };

          // update authService
          this.authService.setUser(res);

          this.isEditing = false;
          this.isSaving = false;

        },

        error: (err) => {

          console.error("Save failed:", err);

          this.isSaving = false;

        }

      });

  }

}
