import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Catalogue, IMenu } from '../models/catalogue.model';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private readonly catalogue_url:string = 'http://127.0.0.1:8000/api/catalogues';
  private readonly menu_url:string = 'http://127.0.0.1:8000/api/menus/';
  
  cpt: number=0;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { }

  getProduitsObs():Observable<any>{
    return this.http.get<any>(this.catalogue_url)
    // console.log();
  }

  all():Observable<Catalogue> {
    return this.http.get<any>(this.catalogue_url).pipe(
      map(data=>{
        let catalogues : Catalogue= {
          burgers: data.burgers,
          menus:data.menus,
        }
        data.produits=[...catalogues.menus,...catalogues.burgers]
        return data;
      }),
    )
  }
  getOneMenus(id: number): Observable<any> {
    return this.http.get<any>(this.menu_url + id);
  }
  getOnMenus(id:string,menus:IMenu[]):IMenu {
    const menu = menus.find((menu)=>
    {
      return menu.id.toString()===id
    });
    if (!menu) {
      throw new Error("Menu not Found");
    }else{
      return menu;
    }
  }

  addCart(){
    //  cpt+= this.cpt;
      return ++this.cpt;
    }

  convertImg(param: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, "+param); 
  }
}
