import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  data:any
  token:any
  constructor(
    private storage : StorageService,
    private router: Router
  ) { }

  async saveToken(token: string,id:string) {
    let tok = await this.storage.getData('token')
      this.storage.addData(token,id).then(()=>{
        window.location.reload();
      } );
 }
  isLogged():boolean{
    let test:boolean
    this.storage.getData('token') .then(
      (result) => {
        this.data = result
       console.log("result "+result)
       return result
      }
      )
    console.log(" is logged "+this.data)
    return test
  }
}
