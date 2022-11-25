import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private frStore:FirestoreService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public admSvc: AdminService,
    public authSvc: AuthService,) { }

  ngOnInit() {
  }

  onLogout(){
    console.log('logout');
    this.authSvc.logout();
    this.router.navigateByUrl('/login');
  }

}
