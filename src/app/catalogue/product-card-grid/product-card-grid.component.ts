import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu, IBurger } from '../models/catalogue.model';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product-card-grid',
  templateUrl: './product-card-grid.component.html',
  styleUrls: ['./product-card-grid.component.scss'],
})
export class ProductCardGridComponent implements OnInit {

  @Input() produit:IMenu | IBurger
  disabled:boolean=false;

  constructor(private route:Router, private data:CatalogueService,) { }

  ngOnInit() {}

  convert(url: string){
    return this.data.convertImg(url)
  }
  // routing: fonction pour naviger vers detail
  showDetails(produit:any){
    // alert("ok");
    this.route.navigateByUrl("produit/" +produit.id)
  }
  
  showCart(product:any){
    return product.burgers? this.disabled=false : this.disabled;
  }
  // bloquer l-incrementation du panier au niveau du produit=====================
  
  // addBurgerToCart(prod:any){
  //   this.panier.putToPanier(prod) ;
  //   this.disabled=false;
    
  //   // prix total commande=============
  //   this.panier.getPrixTotal();
   
  // }

}
