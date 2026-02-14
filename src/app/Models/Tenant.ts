export interface Tenant {
  tenantId: string;        // Guid -> string
  name: string;
  subdomain: string;
  isActive: boolean;
  customDomain?: string;
  createdUtc: string;      // DateTime -> string (ISO format)

  licenseKey?: number;
  customerId?: number;

  customer?: Customer;
  license?: License;
}

export interface Customer {
  customerId: number;
  customerName: string;
  email: string;
  phone: string;
  address?: string;
  gstin?: string;
  tenants?: Tenant;
}


export interface License {
  licenseId: number;
  licenseType: string;   // "Trial" | "Standard" | "Premium"
  licenseKey: string;    // computed on server

  expiryDate: string;
  issuedDate: string;

  status: string;        // "Active" | "Expired" | "Expiring Soon"

  tenant?: Tenant;
}
