import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list-name",
  templateUrl: "./list-name.component.html",
  styleUrls: ["./list-name.component.css"],
})
export class ListNameComponent implements OnInit {
  userData: any[] = [];
  searchQuery: string = "";
  userId: number;
  users_list: any[] = [];
  paginatedUsers: any[] = [];

  currentPage: number = 1;
  pageSize: number = 6;
  totalUsers: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  common_obj: any = { search: "" };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      if (params['page']) {
        this.currentPage = +params['page'];
      }
      this.getUsers(); 
    });
  }
  

  onEdit(id: any): void {
    console.log(id);
    this.router.navigate([`/update/${id}`]);
  }
    deleteUser(id: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe((response: any) => {
        console.log("API Response:", response);
        if (response.success == 1) {
          this.getUsers();
        }
      });
    }
  }
  getUsers(): void {
    if (this.searchQuery !== this.common_obj.search) {
      this.currentPage = 1;
      this.common_obj.search = this.searchQuery;
    }

    this.router.navigate([], {
      queryParams: { search: this.searchQuery || null, page: this.currentPage },
      queryParamsHandling: "merge",
    });

    const requestData = { search: this.searchQuery };

    this.adminService
      .getUserData(this.common_obj)
      .subscribe((response: any) => {
        if (response.success == 1) {
          this.users_list = response.users_list;
          this.totalUsers = this.users_list.length;
          this.totalPages = Math.ceil(this.totalUsers / this.pageSize);

          // this.users_list = this.users_list.map(user => {
          //   if (!user.profile_image) {
          //     user.profile_image = 'assets/user.profile_image';  // Fallback image
          //   }
          //   return user;
          // })

          this.updatePaginatedUsers();
          this.updatePageNumbers();
        }
      });
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedUsers = this.users_list.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  updatePageNumbers(): void {
    const pageCount = this.totalPages;
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    this.pageNumbers = pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
      this.updatePageNumbers();

      this.router.navigate([], {
        queryParams: {
          search: this.searchQuery || null,
          page: this.currentPage,
        },
        queryParamsHandling: "merge",
      });
    }
  }
}
