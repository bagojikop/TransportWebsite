export interface Sys00203 {
  userId: number;
  userName?: string;
  userLongname?: string;
  mobileno?: string;
  emailId?: string;
  isAdmin: boolean;

  cred?: Sys00201;
 

}

export interface Sys00201 {
  userId: number;
  password?: string;

  user?: Sys00203;
}



export interface Sys00204 {
  userId: number;

  a?: number;
  e?: number;
  d?: number;
  l?: number;
  p?: number;
  o?: number;

  user: Sys00203;
}


export interface Sys00206 {
  id: number;
  modulename: string;

  sys00207s: Sys00207[];
}



export interface Sys00207 {
  id: number;

  userId?: number;
  moduleId?: number;

  moduleName?: Sys00206;
  user?: Sys00203;
  status?:boolean
}

 