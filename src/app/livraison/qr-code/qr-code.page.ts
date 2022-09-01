import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/connexion/services/auth.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  id: any;
  token: any;
  public qrCodeDownloadLink: SafeUrl = '';
  public myAngularxQrCode: string = null;
  dataQrCode: string;

  constructor() {
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit() {}
  
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
