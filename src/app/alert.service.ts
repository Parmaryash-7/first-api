import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseToast(icon: 'success' | 'error' | 'info' | 'warning', title: string, message: string) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: icon,
      // title: title, // define if needed
      text: message,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
      background: '#2f2f2f',
      color: '#fff',
      customClass: {
        popup: 'small-toast'
      },
    });
  }

  success(message: string, title: string = 'Success') {
    this.baseToast('success', title, message);
  }

  error(message: string, title: string = 'Error') {
    this.baseToast('error', title, message);
  }

  info(message: string, title: string = 'Info') {
    this.baseToast('info', title, message);
  }

  warning(message: string, title: string = 'Warning') {
    this.baseToast('warning', title, message);
  }

  confirm(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      background: '#2f2f2f',
      color: '#fff',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'small-toast'
      },
      
    });
  }
}