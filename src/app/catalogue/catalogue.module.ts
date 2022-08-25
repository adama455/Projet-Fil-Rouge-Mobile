import { NgModule } from '@angular/core';
import { ProductCardListComponent } from './product-card-list/product-card-list.component';
import { ProductCardGridComponent } from './product-card-grid/product-card-grid.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CataloguePageRoutingModule } from './catalogue-routing.module';

import { CataloguePage } from './catalogue.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { MainMenuPage } from '../main-menu/main-menu.page';
import { DetailProductComponent } from './detail-product/detail-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CataloguePageRoutingModule,
    HttpClientModule,
    IonicHeaderParallaxModule,

    
  ],
  declarations: [
    CataloguePage,
    ProductCardListComponent,
    ProductCardGridComponent ,
    DetailProductComponent,
    MainMenuPage
  ]
})
export class CataloguePageModule {}
