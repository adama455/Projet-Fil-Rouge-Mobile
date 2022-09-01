import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Burger,
  Frite,
  IBoisson,
  IBurger,
  ICatalogue,
  IFrite,
  IMenu,
  ITaille,
  ITailleBoisson,
  Taille,
} from '../models/catalogue.model';
import { CatalogueService } from '../services/catalogue.service';
import { MenuService } from '../services/menu.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  produits!: IBurger[] | IMenu[];
  fritess!: IFrite[];
  boissons!: IBoisson[];
  @Input() produit!: IBurger | IMenu;
  // complement!:IComplement;

  // /////////// ça concerne les sous détail de Menu////////////////
  ////////////////////////////////////////////////////////////////
  menu!: IMenu;
  burgerr!: IBurger;
  menus!: IMenu[];
  burgerrs!: IBurger[];
  burgers: Burger[] = [];
  frites: Frite[] = [];
  tailles!: ITaille[];
  frit: Frite[] = [];
  frite!: Frite;
  @Input() burger!: Burger; ///tableau de burger ki est ds menu

  taille!: Taille;
  taillee!: Taille[];
  tailless!: ITaille;

  allBurgers!: IBurger[];
  allFrites!: IFrite[];
  tailleBoissons!: ITailleBoisson[];
  allBoissons!: IBoisson[];
  boisson!: IBoisson;
  parametre!: number;
  param!: string;

  disabled!: boolean;
  menuu!: IMenu;
  menuSimilaires: IMenu[] = [];
  burgerSimilaires: any[] = [];

  quantiteBoissonChoisi: number = 0;

  ///////////////////////////////////////////////////////////////////////

  constructor(
    private data: CatalogueService,
    private route: ActivatedRoute,
    private panierService: PanierService,
    private menuService: MenuService
  ) {}

  id: number = +this.route.snapshot.params['id'];

  ngOnInit(): void {
    // this.data.getComplementsObs().subscribe(
    //   (data:IComplement)=>{
    //     this.fritess=data.frites;
    //     this.boissons=data.boissons;
    //     // console.log(data);
    //   }
    // );

    this.data.getProduitsObs().subscribe((cata: ICatalogue) => {
      cata.burgers.forEach((product: IBurger) => {
        if (this.id == product.id) {
          this.produit = product;
          // console.log(product);
        }

        this.data.getProduitsObs().subscribe((cata: ICatalogue) => {
          cata.burgers.forEach((produit: IBurger) => {
            // console.log(cata);
            this.produits.forEach((prod) => {
              if (produit.id !== prod.id) {
                this.burgerSimilaires.push(prod);
                console.log(this.burgerSimilaires);
              }
            });
          });
        });

        return;
      });

      cata.menus.forEach((product: IMenu) => {
        if (this.id == product.id) {
          this.produit = product;
          this.frites = product.frites; //les frites du munu
          this.tailles = product.tailles; //les tailles de boisson du menu
          this.menuService.recupBoisson(this.tailles);
          this.tailles.forEach((taillesss) => {
            this.tailless = taillesss;
            // this.data.qteTotal=taillesss.quantite;
            // this.data.tabQteBoisson[taillesss]
          });
          // this.burgers=product.burgers;
          // console.log(this.produit);
          return;
        }
      });
    });

    // /////////// ça concerne les burgers sous détail de Menu////////////////
    ////////////////////////////////////////////////////////////////

    this.parametre = this.route.snapshot.params['id'];
    this.param = this.parametre.toString();
    this.data.getProduitsObs().subscribe((data: any) => {
      this.menus = data.menus;
      this.menu = this.data.getOnMenus(this.param, this.menus);
      console.log(this.menu);
      this.allBurgers = data.burgers; //l'enssemble des burgers dans catalogue
      this.burgers = this.menu.burgers; //l'enssemble des burgers dans menu
      this.allBurgers.forEach((oneBurger) => {
        this.burgers.forEach((oburger) => {
          // console.log(oburger);
          if (oneBurger.id === oburger.burger.id) {
            oburger.burger.image = oneBurger.image;
          }
        });
      });
    });
  }

  addMenuToCart(prod: any) {
    this.panierService.putToPanier(prod);
    this.disabled = false;

    // prix total commande=============
    this.panierService.getPrixTotal();
  }

  convert(url: string) {
    return this.data.convertImg(url);
  }
  // Fonction pour dinamiser le Titre du menu----------------------------------------------===
  showTitle(product: any) {
    return product.burgers ? 'Menus' : 'Burger';
  }

  isMenu(product: any) {
    return product.burgers ? true : false;
  }

  // activePanierMenu(){
  //   return this.menuService.activePanierMenu()
  // }
}
