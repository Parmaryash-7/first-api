import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {
  constructor( private router: Router ) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
