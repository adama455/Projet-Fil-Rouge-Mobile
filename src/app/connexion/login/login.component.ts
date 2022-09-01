import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ICredential } from '../model/connexion-model';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { TokenService } from '../services/token.service';
import jwt_decode from "jwt-decode";

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

  form:ICredential={
    login:'',
    password:''
  }
  token:any

  redirectCata: void;
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private storage: StorageService,
    private tokenServ : TokenService
  ) {}

  ngOnInit() {}


  get password() {
    return this.myForm.get('password');
  }

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
// .......................................................................

  // ....................Connexion Méthode 2..............................
  onSubmit(): void{
    this.authService.loginn(this.form).subscribe(
    data=>{
      this.tokenServ.saveToken(data.token,data.id)
        var tokenI:string  = data.token;
        var decoded: any = jwt_decode(tokenI);
        console.log(decoded.roles[0]);
        console.log(decoded.username);
         if(decoded.roles[0] == ["ROLE_LIVREUR"]){
            this.router.navigate(['/livraison'])
        }
        else{
          this.router.navigate(['/commandes'])
        }
    },
    err=>{
      console.log(err)
      this.storage.bool.next(true);
    },
  )
}

/* toast */
async presentToast() {
  const toast = await this.toastController.create({
    message: 'Connexion reussie',
    duration: 2000,
    color:"success"
  });
  toast.present();
}
  // ....................Fin Connexion Méthode 2..............................


}
