import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivraisonPageRoutingModule } from './livraison-routing.module';

import { LivraisonPage } from './livraison.page';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivraisonPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [LivraisonPage]
})
export class LivraisonPageModule {}
