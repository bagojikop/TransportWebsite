import { Component } from '@angular/core';
import { Mst004 } from '../Models/Firms';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.scss']
})
export class TransportersComponent {
  transporterData  :Mst004={} as Mst004;

  saveTransporter(): void {
    if (this.transporterData.firmName && this.transporterData.firmAlias) {
      console.log('Saving transporter:', this.transporterData);
      alert(`Transporter "${this.transporterData.firmName}" saved successfully!`);
      this.resetForm();
    }
  }

  cancel(): void {
    this.resetForm();
    console.log('Form cancelled');
  }

  private resetForm(): void {
     
  }
}