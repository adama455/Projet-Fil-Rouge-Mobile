import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const STORAGE_KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.storage.create();
   }

    bool = new BehaviorSubject<any>(false);
    getBool(){
     return this.bool.asObservable();
    }

    async getData(item){
    return await this.storage.get(item)
  }

  async addData(item,id){
     await  this.storage.set('token', item)
     await this.storage.set('id', id)
  }
  async saveData(key,item){
    await  this.storage.set(key, item)
  }
  clearAll(){
    this.storage.clear()
  }
}

