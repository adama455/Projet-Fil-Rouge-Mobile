import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRCodeModule } from 'angularx-qrcode';
import { QrCodePage } from './qr-code.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,

  ],
  declarations: [QrCodePage]
})
export class QrCodePageModule {}
