import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CleanObjService {

  constructor() {}

  /**
   * Removes:
   * ✔ null
   * ✔ undefined
   * ✔ empty strings ""
   * ✔ empty objects {}
   * ✔ empty arrays []
   */
  cleanObject(obj: any): any {
    if (obj === null || obj === undefined) return null;

    // Handle Array
    if (Array.isArray(obj)) {
      const cleanedArray = obj
        .map(item => this.cleanObject(item))
        .filter(item =>
          item !== null &&
          item !== undefined &&
          !(typeof item === 'object' && Object.keys(item).length === 0)
        );

      return cleanedArray.length ? cleanedArray : null;
    }

    // Handle Object
    if (typeof obj === 'object') {
      const cleanedObj: any = {};

      Object.keys(obj).forEach(key => {
        const value = this.cleanObject(obj[key]);

        if (
          value !== null &&
          value !== undefined &&
          value !== '' &&
          !(typeof value === 'object' && Object.keys(value).length === 0)
        ) {
          cleanedObj[key] = value;
        }
      });

      return Object.keys(cleanedObj).length ? cleanedObj : null;
    }

    // Handle primitive values
    if (obj === '') return null;

    return obj;
  }
}
