import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";


@Injectable({
  providedIn: 'root'  // Global service available to the entire app
})
export class MsgBox {
  Show(typ: messageType, title?: string, message?: string): Promise<SweetAlertResult<any>> {
    switch (typ) {
      case messageType.Success:
        return Swal.fire({
          icon: "success",
          title: title,
          text:message,
          showConfirmButton: false,
          timer: 1500
        }).then(result => result); // Ensure return of a valid Promise

      case messageType.Error:
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message
        }).then(result => result);

      case messageType.Warning:
        return Swal.fire({
          icon: "warning",
          title: title,
          text: message,
          showConfirmButton: false,
        }).then(result => result);

      case messageType.WarningOk:
        return Swal.fire({
          icon: "warning",
          title: title,
          text: message,
        }).then(result => result);
      case messageType.Information:
        return Swal.fire({
          icon: "info",
          title: title,
          text:message
          
        }).then(result => result);
      case messageType.DeleteConfirm:
        return Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });

      case messageType.SaveConfirm:
        return Swal.fire({
          title: "Are you sure?",
          text: "Do you want to save changes?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Save It!"
        });

      default:
        return Promise.resolve({ isConfirmed: false, isDenied: false, isDismissed: true, value: null });

    }
  }
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}

export enum messageType {
      Success ,
      Error ,
      Warning,
      WarningOk,
      DeleteConfirm,
      SaveConfirm,
      Information

}