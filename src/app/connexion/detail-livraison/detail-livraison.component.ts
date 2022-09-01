import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import jsQR from 'jsqr';
import { AuthService } from '../services/auth.service';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-detail-livraison',
  templateUrl: './detail-livraison.component.html',
  styleUrls: ['./detail-livraison.component.scss'],
})
export class DetailLivraisonComponent implements OnInit {
  // livraisonLivreur:any[]=[]
  oneLiv: any;
  commandesLiv: any[]=[];
  id: number = +this.route.snapshot.params['id'];

  // QR Code:::::::::::::::
  public myAngularxQrCode: string = null;
  public qrCodeDownloadLink: SafeUrl = '';
  tab: any[] = [];
  data: any;
  cmd: any;
  message: string;

  // Scan Qr-code--------------------------
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult= null;
  loading: HTMLIonLoadingElement = null;
  codecmd: any;
  idClient: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    public toastController: ToastController
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }

    this.myAngularxQrCode = 'Your QR code data string'; //QR Code.................
  }
  // Qr Code:::::::::::::::::::::::::

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  // Debut Scan code QR Code Capacitor:::::::::::::
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }
  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }
  // Helper functions
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          },
        },
      ],
    });
    toast.present();
  }
  reset() {
    this.scanResult = null;
  }
  stopScan() {
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        //......................Debut Validation livraison du client....................
        this.commandesLiv.forEach((command) => {
          if (
            command.client.id == this.idClient && 
            command.code != this.scanResult
          ) {
            
            this.presentToast('verifier le code que vous avez entrer', 'danger');
            
          }else{
            console.log(command.code);
            this.presentToast('successfully', 'success');
            this.http
            .put<any>('http://127.0.0.1:8000/api/commandes/' + command.id, {
              etat: 'livrer',
            })
            .subscribe();
            this.router.navigateByUrl('/livraison');
          }
        });
        //....................... Fin Validation livraison du client....................
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  captureImage() {
    this.fileinput.nativeElement.click();
  }

  handleFile(files: FileList) {
    const file = files.item(0);

    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(
        img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.scanResult = code.data;
        this.showQrToast();
      }
    };
    img.src = URL.createObjectURL(file);
  }
  // Fin Scan code QR Code Capacitor:::::::::::::

  ngOnInit() {
    this.authService.getOneLivraisonsObs(this.id).subscribe((livraison) => {
      this.oneLiv = livraison;
      console.log(this.oneLiv);
      this.oneLiv.commandes.forEach(cmd => {
        if (cmd.etat == 'en cours de livraison') {
          this.commandesLiv.push(cmd);
          this.cmd = cmd;
          this.codecmd = cmd.code;
          this.idClient = cmd.client.id;
          console.log(this.idClient);

          console.log(this.codecmd);
        }
      });
      console.log(this.commandesLiv);
      // this.livraison=oneLiv;
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Entrer votre code svp!',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            console.log(data.code);

            this.verifCodeChangeEtat(this.tab[0], data.code, this.tab[1]);
          },
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: '0148',
          name: 'code',
        },
      ],
    });
    await alert.present();
  }

  infoCmde(id: any, codeCommade: any) {
    this.tab = [id, codeCommade];
    console.log(this.tab);
    return this.tab;
  }

  verifCodeChangeEtat(id: number, codeSaisi: any, codeCommade: any) {
    if (codeSaisi != codeCommade) {
      this.presentToast('verifier le code que vous avez entrer', 'danger');
    } else {
      this.presentToast('successfully', 'success');
      this.http
        .put<any>('http://127.0.0.1:8000/api/commandes/' + id, {
          etat: 'livrer',
        })
      .subscribe();
      this.router.navigateByUrl('/livraison');

    }
  }

  /* toast */
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
    });
    toast.present();
  }
}
