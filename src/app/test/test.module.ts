import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TestPage } from './test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    ZXingScannerModule,
  ],
  declarations: [TestPage]
})
export class TestPageModule {

  
}
