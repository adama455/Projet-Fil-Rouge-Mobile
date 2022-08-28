import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  // async login() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   if (!this.myForm.valid) {
  //     await loading.dismiss();
  //     const alert = await this.alertCtrl.create({
  //       header: 'Login failed',
  //       message: 'vous etes admin',
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   } else {
  //     this.authService.login(this.myForm.value);
  //     await loading.dismiss();
  //   }
  // }

  // async loginn() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   this.authService.login(this.myForm.value).subscribe(
  //     async (res) => {
  //       console.log(this.email.value);
  //       await loading.dismiss();

  //       // this.router.navigateByUrl('catalogue', { replaceUrl: true });
  //     },
  //     async (res) => {
  //       await loading.dismiss();
  //       const alert = await this.alertCtrl.create({
  //         header: 'Login failed',
  //         message: res.error.error,
  //         buttons: ['OK'],
  //       });

  //       await alert.present();
  //     }
  //   );

  // }

  // Easy access for form fields
  get email() {
    return this.myForm.get('login');
  }

  get password() {
    return this.myForm.get('password');
  }

  // login() {
  //   this.authService.login(this.myForm.value).subscribe(async res => {
  //     if (res) {
  //       this.router.navigateByUrl('catalogue');
  //     } else {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Login Failed',
  //         message: 'Wrong credentials.',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   });
  // }

  // login() {
  //   this.authService.login(this.myForm.value).subscribe(async res => {
  //     if (res) {
  //       this.router.navigateByUrl('catalogue');
  //     } else {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Login Failed',
  //         message: 'Wrong credentials.',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   });
  // }

  // async presentPrompt() {
  //   let alert = await this.alertCtrl.create({
  //     message: 'Login',
  //     inputs: [
  //       {
  //         name: 'username',
  //         placeholder: 'Username'
  //       },
  //       {
  //         name: 'password',
  //         placeholder: 'Password',
  //         type: 'password'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Login',
  //         handler: data => {
  //           if (this.myForm.valid) {
  //             // logged in!
  //           } else {
  //             // invalid login
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  async submitForm() {
    const loading = await this.loadingController.create({duration: 5000});
    await loading.present();
    this.isSubmitted = true;
    if (!this.myForm.valid) {
      await loading.dismiss();
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.myForm.value);
      this.authService.login(this.myForm.value);
      await loading.dismiss();
    }
  }

  // méthode getter pour accéder au contrôle du formulaire

  get errorControl() {
    return this.myForm.controls;
  }

  // navigMenu() {
  //   this.router.navigateByUrl('catalogue');
  // }
}
