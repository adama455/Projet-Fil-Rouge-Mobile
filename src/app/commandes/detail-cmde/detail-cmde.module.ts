import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCmdePageRoutingModule } from './detail-cmde-routing.module';

import { DetailCmdePage } from './detail-cmde.page';
import { QRCodeModule } from 'angularx-qrcode';
import { LoaderComponent } from 'src/app/loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCmdePageRoutingModule,
    QRCodeModule,

  ],
  declarations: [DetailCmdePage,LoaderComponent]
})
export class DetailCmdePageModule {}
