import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-livraisons',
  templateUrl: './list-livraisons.component.html',
  styleUrls: ['./list-livraisons.component.scss'],
})
export class ListLivraisonsComponent implements OnInit {
  livreur:any
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    // console.log(this.authService.getToken().username); //recuperation du login  du liveur connecter
    let login = this.authService.getToken().username;
    this.authService.getUser(login).subscribe(liv=>{
      this.livreur =liv;
      console.log(this.livreur.livaisons);
    })
    
  }

}
