import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConnexionPageRoutingModule } from './connexion-routing.module';

import { ConnexionPage } from './connexion.page';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ConnexionPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ConnexionPage,
    LoginComponent
   
  ],
  exports: [
    LoginComponent
  ]
})
export class ConnexionPageModule {}
