import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../connexion/services/auth.service';
import { GetCommande, IUser } from './model-cmde';
import { CommandeService } from './services/commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {
  clients: IUser[] = [];
  client!: IUser;
  emailLivreurConnect: any = this.authService.getToken().username;
  oneCmd: any;
  mesCommandes: GetCommande[] = [];

  constructor(
    private cmdService: CommandeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cmdService
      .getClientsObs()
      .pipe(
        take(1),
        map((data: any) => {
          data.filter((y: IUser) => {
            if (y.login == this.emailLivreurConnect) {
              this.clients.push(y);
              this.clients.forEach((client: any) => {
                client.commandes.forEach((cmd: any) => {
                  if (cmd.etat=="en cours de livraison") {
                    this.mesCommandes.push(cmd);
                  }
                  this.oneCmd = cmd
                });
                // console.log(this.mesCommandes);
              });
              // console.log(this.clients);
            }
          });
        })
      )
      .subscribe();
  }
  // fonction pour aller dans detail commande
  detailCommande(commande: GetCommande) {
    this.router.navigateByUrl('commandes/' + commande.id);
  }
}
