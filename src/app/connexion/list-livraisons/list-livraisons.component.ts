import { Component, OnInit } from '@angular/core';
// import { SafeUrl } from '@angular/platform-browser';
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
  livraisonLivreur:any[]=[];
  onLiv:any
  emailLivreurConnect:any=this.authService.getToken().username;
  // public myAngularxQrCode: string = null;
  // public qrCodeDownloadLink: SafeUrl = "";
  constructor(private authService:AuthService, private router:Router) {
    
  }
  
  // this.myAngularxQrCode = 'Your QR code data string';
  // onChangeURL(url: SafeUrl) {
  //   this.qrCodeDownloadLink = url;
  // }


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
