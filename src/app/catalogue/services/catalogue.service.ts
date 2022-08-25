import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IMenu } from '../models/catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private readonly catalogue_url:string = 'http://127.0.0.1:8000/api/catalogues';
  cpt: number=0;

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { }

  getProduitsObs():Observable<any>{
    return this.http.get<any>(this.catalogue_url)
    // console.log();
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
