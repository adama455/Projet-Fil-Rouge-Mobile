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
  livraisons:any[]
  livraisonLivreur:any[]=[]
  emailLivreurConnect:any=this.authService.getToken().username;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getLivraisonsObs().subscribe(livraison=>{
      // console.log(livraison);
      this.livraisons=livraison;
      this.livraisons.forEach((oneLiv:any)=>{
      console.log(oneLiv.livreur.login);
      // console.log(this.emailLivreurConnect);
        if (oneLiv.livreur.login ==this.emailLivreurConnect) {
          this.livraisonLivreur.push(oneLiv);
          console.log(this.livraisonLivreur)
        }
      })
      
    })
    
  }
  detailLivraison(oneLivraison){
    this.router.navigateByUrl('livraison/'+ oneLivraison.id)
  }

}
