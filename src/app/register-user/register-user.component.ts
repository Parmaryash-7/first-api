import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  title: string = 'Register';
  constructor() { }

  ngOnInit() {
    document.title = this.title;
}

registerData = {
    name: '',
    email: '',
   phone_no: '',
    password: '',
    confirmPassword: '',
};

}
