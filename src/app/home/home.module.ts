import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ConnexionPageModule } from '../connexion/connexion.module';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ConnexionPageModule

  ],
  
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
