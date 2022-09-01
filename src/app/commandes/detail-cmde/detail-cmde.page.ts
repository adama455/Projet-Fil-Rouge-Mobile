import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/connexion/services/auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { IUser, GetCommande } from '../model-cmde';
import { CommandeService } from '../services/commande.service';
import { CatalogueService } from 'src/app/catalogue/services/catalogue.service';


@Component({
  selector: 'app-detail-cmde',
  templateUrl: './detail-cmde.page.html',
  styleUrls: ['./detail-cmde.page.scss'],
})
export class DetailCmdePage implements OnInit {
  // QR Code:::::::::::::::
  public myAngularxQrCode: string = null;
  public qrCodeDownloadLink: SafeUrl = '';
  id: number = +this.route.snapshot.params['id'];

  client: IUser;
  commande!: GetCommande;
  idUserConnect: number = this.authService.getToken().id;
  oneCmd: any;
  code:string;

  constructor(private catalogService:CatalogueService, private authService: AuthService, private route: ActivatedRoute,private cmdService: CommandeService,private router: Router) {
    this.myAngularxQrCode = 'Your QR code data string'; //QR Code.................
  }

  // Qr Code:::::::::::::::::::::::::

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  ngOnInit() {
    this.cmdService.getOneCommandes(this.id).subscribe((data:any) => {
      this.commande=data;
      console.log(this.commande.code);
      this.code = this.commande.code.toString();
    })

  }

  convert(url: any){
    return this.catalogService.convertImg(url)
  }

}
