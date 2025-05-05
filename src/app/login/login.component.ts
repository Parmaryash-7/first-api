import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AlertService } from "../alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  loginError: string = "";
  passwordVisible: boolean = false;
  user = {
    email: "",
    password: "",
  };
  constructor(private adminService: AdminService, private router: Router ,  private alert :AlertService) {}

  ngOnInit() {
    if (this.adminService.isLoggedIn) {
      this.router.navigate(["/list-name"]);
    }
  }

  error(s: string){
    this.alert.error(s)
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.user.email);
  }
  login(form) {
    if (form.valid) {
      this.adminService.login(this.user).subscribe((response) => {
        if (response.success == 1) {
          alert("Successfully Login");
          localStorage.setItem("authToken", response.data.id);
          this.router.navigate(["/list-name"]);
        }
      });
    }


    // if (this.adminService.login(obj)) {
    //   this.router.navigate(["/list-name"]);
    // } else {
    //   this.loginError = "invalid username or password";
    // }
  }

  //  login(){
  //    if (this.username === 'admin' && this.password === 'password'){
  //     localStorage.setItem('authToken','myToken');
  //     this.router.navigate(['/list-name'])
  //    }else{
  //     alert('Invalid userId and password')
  //    }
  //  }
}
