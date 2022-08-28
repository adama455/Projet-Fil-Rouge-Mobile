import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-livraison',
  templateUrl: './detail-livraison.component.html',
  styleUrls: ['./detail-livraison.component.scss'],
})
export class DetailLivraisonComponent implements OnInit {
  // livraisonLivreur:any[]=[]
  oneLiv: any;
  commandesLiv: any[];
  id: number = +this.route.snapshot.params['id'];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.getOneLivraisonsObs(this.id).subscribe((livraison) => {
      this.oneLiv = livraison;
      console.log(this.oneLiv);
      this.commandesLiv = this.oneLiv.commandes;
      console.log(this.commandesLiv);
      // this.livraison=oneLiv;
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Entrer votre code svp!',
      buttons: ['OK'],
      inputs: [
        {
          type: 'number',
          placeholder: '0148',
        }
      ],
    });

    await alert.present();
  }

}
