import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../connexion/services/auth.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {

  livreur:any
  livraisons:any[]
  livraisonLivreur:any[]=[];
  onLiv:any
  emailLivreurConnect:any=this.authService.getToken().username;
  // public myAngularxQrCode: string = null;
  // public qrCodeDownloadLink: SafeUrl = "";
  constructor(private authService:AuthService, private router:Router) {
    // assign a value
  }

  ngOnInit() {
    this.authService.getLivraisonsObs().subscribe(livraison=>{
      // console.log(livraison);
      this.livraisons=livraison;
      this.livraisons.forEach((oneLiv:any)=>{
        this.onLiv=oneLiv;
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
