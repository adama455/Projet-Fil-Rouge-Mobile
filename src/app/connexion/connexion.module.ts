import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConnexionPageRoutingModule } from './connexion-routing.module';

import { ConnexionPage } from './connexion.page';
import { LoginComponent } from './login/login.component';
import { ListLivraisonsComponent } from './list-livraisons/list-livraisons.component';
import { DetailLivraisonComponent } from './detail-livraison/detail-livraison.component';
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
    LoginComponent,
    ListLivraisonsComponent,
    DetailLivraisonComponent
   
  ],
  exports: [
    LoginComponent
  ]
})
export class ConnexionPageModule {}
