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
import { QRCodeModule } from 'angularx-qrcode';
import { LoaderComponent } from '../loader/loader.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ConnexionPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
  ],
  declarations: [
    ConnexionPage,
    LoginComponent,
    ListLivraisonsComponent,
    DetailLivraisonComponent,
    LoaderComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class ConnexionPageModule {}
