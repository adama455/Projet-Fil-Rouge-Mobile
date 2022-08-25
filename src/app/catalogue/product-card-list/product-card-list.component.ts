import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu, IBurger } from '../models/catalogue.model';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss'],
})
export class ProductCardListComponent implements OnInit {

 

  @Input() catalogue:IMenu | IBurger
  
  constructor(private route:Router, private data:CatalogueService,) { }


  ngOnInit() {}

  detailProduit(){
    
  }
  convert(url: string){
    return this.data.convertImg(url)
  }
}
