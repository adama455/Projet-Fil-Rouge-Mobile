import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  connected: boolean;
  // myForm={
  //   "login":'',
  //   "password":'',
  // }
  myForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  redirectCata: void;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    // alert();
    console.log(this.myForm.value);
    this.authService.login(this.myForm.value);
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.myForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.myForm.value);
      this.authService.login(this.myForm.value);
      this.navigMenu()
    }
  }
  // méthode getter pour accéder au contrôle du formulaire
  get errorControl() {
    return this.myForm.controls;
  }

  navigMenu() {
    this.router.navigateByUrl('catalogue');
  }
}
