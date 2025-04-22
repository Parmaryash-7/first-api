import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-api';

  constructor(private admin:AdminService) { }
  
    ngOnInit() {
      // this.projectList();
    }
  
    // projectList() {
      // console.log('object')
      // this.admin.projectList().subscribe((response) => {
        // console.log(response);
      // })
    // }

}
