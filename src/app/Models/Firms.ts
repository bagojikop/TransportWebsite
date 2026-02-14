export interface Mst004 {
  firmCode: number;
  firmName: string;
  firmAlias?: string;
  firmAddress: string;
  firmPlace: string;
  firmPinCode?: number;
  firmStateCode: number;
  firmFno?: string;
  emailId?: string;
  webAddress?: string;
  jurisdiction?: string;
  firm_transId?: string;
  firmPan?: string;
  active: boolean;
  firmBankName?: string;
  firmBankAccno?: string;
  firmBankIfsc?: string;
  createdUser?: string;
  modifiedUser?: string;
  createdDt?: string;   // Date from API comes as string
  modifiedDt?: string;
  firmMobNo?: string;
  tenantId?: string;
  mst00401?: Mst00401;
  mst00603?: mst00603;
  mst00409?: Mst00409;
  mst00410?: Mst00410;
}

export interface Mst00401 {
    firmCode: number;
    logo?: string;  // base64 string
}

export interface Mst00409 {
  firmId: number;
  gstFrom?: string;
  gstTyp?: number;
  gstNo?: string;
  
}

export interface Mst00410 {
  firmId: number;
  mail?: string;
  einv?: string;
  gst?: string;
  waba?: string;
  
}
export interface mst00603 {
  stateCode: number;
  stateName: string; 
}