import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css']
})
export class ProjectListingComponent implements OnInit {

  constructor(private admin:AdminService) { }

  ngOnInit() {
    // this.projectList();
  }

  // projectList() {
  //   this.admin.projectList().subscribe((response) => {
  //     console.log(response);
  //   })
  // }
}
