import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBurger, IMenu } from '../models/catalogue.model';
// import { BehaviorSubject, map, Observable, take } from 'rxjs';
// import { IBurger, IMenu } from 'src/app/models/catalogue.model';
// import { Commande } from 'src/app/models/commande';

@Injectable({
  providedIn: 'root',
})
export class PanierService {

  prix: number = 0;

  constructor( private http:HttpClient) {
    let existingCartItems = JSON.parse(
      localStorage.getItem('products') || '[]'
    );
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  private itemsSubject: any = new BehaviorSubject<IBurger[] | IMenu[]>([]);
  // tableau==============================================
  items$ = this.itemsSubject.asObservable();
  quantity = this.items$.quantity;

  commande_url:string = 'http://127.0.0.1:8000/api/commandes';
  ldc:Array<any> =[];


  getCommandeObs(){
    return this.http.get<any>(this.commande_url);

  }

  // Fornction pour incrementer la quantite du produit clicker au niveau du panier
  putToPanier(product: any, action: 'in' | 'out' = 'in') {
    this.items$.subscribe((products: IBurger[] | IMenu[]) => {
      let tab: IBurger[] | IMenu[] = JSON.parse(
        localStorage.getItem('products') || '[]'
      );
      // console.log(tab);

      product.quantity = 1;
      if (action === 'in') {
        if (tab) {
          let trouver:IBurger|undefined = tab.find((param: { id: number }) => param.id === product.id);
          if (!trouver) {
            products.push(product);
          } else {
            products.forEach((element) => {
              if (element.id === product.id) {
                element.quantity++;
              }
            });
          }
        }
      } else {
        // suppression au niveau du panier-------------------------------------------
        products.splice(product, 1);
      }
      localStorage.setItem('products', JSON.stringify(products));
    })
  }

  // Supprimer Panier:::::::::::::::::::::::
  // supprimerP(){
  //   localStorage.removeItem('products');
  // }
  exixtInTab(tab: IBurger[] | IMenu[], idProd: number) {
    return tab.find((prod) => {
      return prod.id === idProd;
    });
  }

  getItems(): Observable<IBurger[] | IMenu[]> {
    return this.items$;
  }

  // prix total du panier============= Résumer commande =============
  getPrixTotal(){
    let prixTotal=0;
    this.items$.subscribe((items:any) =>{
      items.forEach((item:any) =>{
        prixTotal+=item.prix*item.quantity;
      })
      localStorage.setItem('products', JSON.stringify(items));
    })
    return prixTotal;
  }

  // prix ligne de commande====================
  // cmdeLinePrice(product: IBurger | IMenu, qte:any){
  //   this.items$
  //   .pipe(
  //     take(1),
  //     map((products: IBurger[] | IMenu[]) => {
  //       products.forEach(element => {
  //         if (element.id === product.id){
  //           element.quantity = qte;
  //         }
  //         localStorage.setItem('products', JSON.stringify(products));
  //       });
  //     } 
  //   )).subscribe();
  // }

  getLineComde(){
    this.items$.subscribe((produits:any) => {
      produits.forEach((product: any) =>{
        this.ldc.push({
          "produit":product,
          "quantiteCmde":product.quantiteCmde,
        });
      })
    })
    return this.ldc;
  }

  // postCommande(body:Commande){
  //   const headers={"Authorization": "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjA4MDk2NjQsImV4cCI6MTY2MjIwOTY2NCwicm9sZXMiOlsiUk9MRV9DTElFTlQiLCJST0xFX1ZJU0lURVVSIl0sInVzZXJuYW1lIjoiZGlvdWZAZ21haWwuY29tIn0.o65xSmJS3fP4UuDXSuKkaNj6JWSjPv0M0kn03hYCrZ0FbCcM12dAgnzXM1IBgAz1ahejh3oS4v6BixIkZnsv5ApVl69R-RiuiSfgHB5VYThHsuWZpk5d5_oK0gq5OK9nprCtuxcd2KvJXY7DZaB-kv1-SP_53bL22EbpIWv98toflMLtOsX8yWsorGpcDMK253M6ejlX48i12dHUVJ4zyoR1ZrUzpMhne0SbcjGOO9PT2cqY9ECBKAgzMwy394o4Uifa1_ztM4RV2HbGhEII81IqWPvHPYowHtpf3uZrtPJGbJO8PfKymIOECE8F2Q3xFqXwPwMMZCAmfKV2K9ashw"}
  //   this.http.post<Commande>(this.commande_url,body,{headers}).subscribe(); 
  // }

  getPanier(){
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

}

function take(arg0: number): any {
  throw new Error('Function not implemented.');
}

