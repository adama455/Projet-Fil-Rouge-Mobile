import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-livraison',
  templateUrl: './detail-livraison.component.html',
  styleUrls: ['./detail-livraison.component.scss'],
})
export class DetailLivraisonComponent implements OnInit {

  livreur:any
  livraisons:any[]
  livraisonLivreur:any[]=[]
  commandesLiv:any[]
  emailLivreurConnect:any=this.authService.getToken().username;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getLivraisonsObs().subscribe(livraison=>{
      console.log(livraison);
      this.livraisons=livraison;
      this.livraisons.forEach((oneLiv:any)=>{
        // console.log(this.emailLivreurConnect);
        this.commandesLiv=oneLiv.commandes;
        console.log(this.commandesLiv);
        
          
        })
      
    })
  }
    
}
