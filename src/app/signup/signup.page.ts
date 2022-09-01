import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor() { }

  myForm = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern(''),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.pattern(''),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    adresse: new FormControl('', [
      Validators.required,
      Validators.pattern(''),
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.pattern(''),
    ]),
  });

  ngOnInit() {
    console.log(this.myForm);
  }

}
