import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mst004, Mst00401, Mst00409, Mst00410 } from '../Models/Firms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { CleanObjService } from '../services/cleanobject.service';
import { messageType, MsgBox } from '../services/MsgBox';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.scss']
})
export class TransportersComponent implements OnInit {
  transporterData: Mst004 = {
    mst00401: {} as Mst00401,
    mst00409: {} as Mst00409,
    mst00410: {} as Mst00410
  } as Mst004;

  id:number=history.state.id;

  customerId:number =this.tenantService.getTenant()?.customerId;
  states: any[] = [];
  selectedStateName: string = '';

  constructor(private http: HttpClient, private router: Router,
    private tenantService: TenantService,
    private cleanObjService: CleanObjService,
    private route: ActivatedRoute,
    private msgBox: MsgBox
    
    ) {}
  ngOnInit(): void {
    this.transporterData = {
      mst00401: {} as Mst00401,
      mst00409: {} as Mst00409,
      mst00410: {} as Mst00410
    } as Mst004;
    this.transporterData.mst00409 ??= {} as Mst00409;
    this.loadStates();

    this.transporterData.tenantId = this.tenantService.getTenant()?.tenantId || 0;
     
      if (!this.id) return;

      this.http.get(`${environment.API_URL}tenant/firm-get`, {
        params: {
          id: this.id,
           tenantId: this.customerId
        }
      })
        .subscribe({
          next: (res) => {
            this.transporterData = res as Mst004;
          },
          error: (err) => {
            console.error('Error loading firm', err.console.error);

          }
        });

      }


  loadStates(): void {
    this.http.get<any[]>('/assets/states.json').subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (error) => {
        console.error('Error loading states:', error);
      }
    });
  }

  onStateChange(event: any): void {
    const selectedCode = event.target.value;
    const selectedState = this.states.find(s => s.stateCode == selectedCode);
    this.selectedStateName = selectedState ? selectedState.stateName : '';
  }

  onLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (!this.transporterData.mst00401)
          this.transporterData.mst00401 = {} as Mst00401;
        this.transporterData.mst00401.logo = e.target.result; // Base64 string save hota hai

      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo(): void {
    this.transporterData.mst00401 = {} as Mst00401;
    // Reset file input
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  saveTransporter(): void {
    const id = this.tenantService.getTenant()?.customerId;
    const data = this.cleanObjService.cleanObject(this.transporterData);
    const url = data.firmCode ? "tenant/firm-edit" : "tenant/firm-create";
    this.http.post(`${environment.API_URL}${url}`, data, { params: { id: id } }).subscribe({
      next: (response) => {
        this.router.navigate(['/transport-dashboard']);

      }, error: (err) => {
       this.msgBox.Show(messageType.Error,"Error", err.message|| err.error)
        
      }
    });
  }


  cancel(): void {
    this.resetForm();
    console.log('Form cancelled');
  }

  private resetForm(): void {
    this.transporterData = {
      mst00401: {} as Mst00401,
      mst00409: {} as Mst00409,
      mst00410: {} as Mst00410
    } as Mst004;
    this.selectedStateName = '';
    this.transporterData = {} as Mst004;
    this.transporterData.mst00401 = {} as Mst00401;

    // Reset file input
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}