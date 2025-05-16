import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  formSubmitted: boolean = false;

  ngOnInit() {
    this.fetchUserId();
  }

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public userId2 = "";

  fetchUserId() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.userId2 = params["id"];
        this.loadUserData(this.userId2);
      }
    });
  }

  public user: any = {
    name: "",
    email: "",
    age: null,
    phone_no: "",
    gender: "",
    profile_image: null,
    password: "",
  };

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  isPasswordValid() {
    return this.user.password.length >= 6;
  }
  restrictSpecialChars(event: KeyboardEvent) {
    const regex = /^[A-Za-z0-9@]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  loadUserData(id) {
    this.adminService.userData({ id }).subscribe((response: any) => {
      console.log(response);
      if (response.success == 1) {
        this.user = response.user;
        // this.user = response.users_list.find((user) => user.id == id);

        // if (this.user.profile_image && this.user.profile_image.preview) {
        //   this.user.profile_image = {
        //     file: this.user.profile_image.file,
        //     preview: this.user.profile_image.preview,
        //     name: this.user.profile_image.name,
        //   };

        this.user.profile_image = {
        file: null,
        preview: this.user.profile_image,
        name: this.user.profile_image,
        };
        console.log(this.user); 
      }
    });
  }



  onImageChange(event: any) {
    const file = event.target.files[0];
    console.log("selected file is ", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profile_image = {
          file: file,
          preview: e.target.result,
          name: file.name,
        };
        // console.log("Image preview URL: ", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  restrictNonNumeric(event: KeyboardEvent) {
    const regex = /[0-9]/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (!this.user.profile_image) {
      alert("Please select a profile image!");
      return;
      
    }

    if (!this.isValidForm()) {
      return;
    }

    console.log(this.user);

    let formData = new FormData();
    formData.append("is_from", "true");

    for (let key in this.user) {
      if (key == "profile_image") {
        if (this.user.profile_image.file) {
          formData.append("profile_image", this.user.profile_image.file);
        } else {
          formData.append("profile_image", this.user.profile_image);
        }
      } else {
        formData.append(key, this.user[key]);
      }
    }
    // formData.append("profile_image", this.user.profile_image.file);

    // for (let key in this.user) {
    //   if (key !== "profile_image") {
    //     formData.append(key, this.user[key]);
    //   }
    // }
    this.adminService.submitFormData(formData).subscribe((response) => {
      if (response.success == 1) {
        this.user = {};
        this.formSubmitted = true;
        alert("Form Submitted Successfully");
      } else {
        alert("Form submission failed. Please try again.");
      }
    });

    this.formSubmitted = true;
    if (this.formSubmitted) {
      setTimeout(() => {
        this.router.navigate(["/list-name"]);
      }, 2000);
    }
  }

  isValidForm(): boolean {
    if (!this.user.name || !this.isNameValid()) {
      alert("Name is required and must be at least 3 characters.");
      return false;
    }

    if (!this.isEmailValid()) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!this.isAgeValid()) {
      alert("Age must be between 1 and 99.");
      return false;
    }

    if (!this.isPhoneValid()) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  }

  isNameValid(): boolean {
    const regex = /^[a-zA-Z\s\-\']{3,}$/;
    return regex.test(this.user.name);
  }

  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.user.email);
  }

  isAgeValid(): boolean {
    if (
      this.user.age < 1 ||
      this.user.age >= 100 ||
      !this.user.age ||
      this.user.age.toString().length > 3
    ) {
      return false;
    }
    return true;
  }

  isPhoneValid(): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(this.user.phone_no);
  }
}
