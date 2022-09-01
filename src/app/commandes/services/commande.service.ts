import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  client_url:string = 'http://127.0.0.1:8000/api/clients/';
  commande_url:string = 'http://127.0.0.1:8000/api/commandes/';


  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

  getClientsObs():Observable<any>{
    return this.http.get<any>(this.client_url);
  }
  getOneClient(id:number):Observable<any>{
    return this.http.get<any>(this.client_url+id);
  }
  getOneCommandes(id:number):Observable<any>{
    return this.http.get<any>(this.commande_url+id);
  }
}
