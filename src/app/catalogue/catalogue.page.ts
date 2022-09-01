import { Component, OnInit } from '@angular/core';
import { IMenu, IBurger, ICatalogue } from './models/catalogue.model';
import { CatalogueService } from './services/catalogue.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {
  menus: IMenu[];
  burgers: IBurger[];
  errorMsg: string;
  catalogues: any[] | undefined = undefined;
  searchText: any;
  valueSegment: string;
  valuePrix: number = 0;
  disabled:boolean=false;


  constructor(
    private alertController: AlertController,
    private route:Router,
    private catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    this.catalogueService.all().subscribe((cata: any) => {
      this.menus = cata.menus;
      this.burgers = cata.burgers;
      console.log(cata);
    });

    // 2Em Methode Pour catalogue............................
    // this.catalogueService.all().subscribe(data => {
    //   this.catalogues = data.produits
    //   console.log(this.catalogues);
    // })

  }

  /* filtres */
  filterProduct(type: string) {
    this.catalogueService.all().subscribe((data) => {
      if (type == 'burger' || type == 'menu') {
        this.catalogues = data.produits?.filter(
          (product) => product.type === type
        );
      } else {
        this.catalogues = data.produits;
      }
    });
  }

  convert(url: string){
    return this.catalogueService.convertImg(url)
  }
  // routing: fonction pour naviger vers detail
  showDetails(produit:any){
    // alert("ok");
    this.route.navigateByUrl("produit/" +produit.id)
  }
  showCart(product:any){
    return product.burgers? this.disabled=false : this.disabled;
  }

  /* alert range */
  async presentAlert() {
    const alert = await this.alertController.create({
      message: `choisissez un prix entre 1000 et 20000 ${this.valuePrix}`,
      inputs: [
        {
          name: 'prix',
          type: 'number',
          min: 1000,
          max: 20000,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.prix);
            this.valuePrix = alertData.prix;
            this.catalogueService.getProduitsObs().subscribe((data) => {
              this.catalogues = data.produits?.filter(
                (product) => product.prix >= this.valuePrix
              );
            });
          },
        },
      ],
    });
    await alert.present();
  }

  segmentValue($ev: any) {
    // this.valueSegment = $ev.detail.value;
    console.log($ev.detail.value);
    this.valueSegment = $ev.detail.value;
  }
}
