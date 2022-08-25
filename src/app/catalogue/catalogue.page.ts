import { Component, OnInit } from '@angular/core';
import { IMenu, IBurger, ICatalogue } from './models/catalogue.model';
import { CatalogueService } from './services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  menus!:IMenu[];
  burgers!:IBurger[];
  errorMsg!:string;
  catalogues!:ICatalogue;
  searchText:any;
  valueSegment:string;
  constructor(private catalogueService: CatalogueService){

  }

  ngOnInit(): void {
    this.catalogueService.getProduitsObs().subscribe(
      (cata:ICatalogue)=>{
        this.menus=cata.menus;
        this.burgers=cata.burgers;
        console.log(cata);
      }
    );  
  }

  segmentValue($ev:any){
    // this.valueSegment = $ev.detail.value;
    console.log($ev.detail.value);
    this.valueSegment=$ev.detail.value
  }
}
