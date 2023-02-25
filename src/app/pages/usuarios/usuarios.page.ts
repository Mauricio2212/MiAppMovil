import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Admin } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { user } from '@angular/fire/auth';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { getDoc } from 'firebase/firestore';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  users: User[] = [];
  admins: Admin[] = [];

  newAdmin: Admin = {
    uid: this.frStore.getId(),
    displayName: '',
    email: '',
    emailVerified: null
  }

  enableNewAdmin = false;
  enableInfoAdmin = false;
  enableInfoUser = false;

  public path = 'users/';
  public path1 = 'admins/';

  loading: any;

  constructor(private frStore:FirestoreService,
              private router: Router,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public admSvc: AdminService,
              public authSvc: AuthService,
              private storageService: FirestorageService) { }

  ngOnInit() {

    this.getAdmins();
    this.getUsers();
  }
  async registerAdmin(email, password) {
    try {
      this.presentLoading();
      const admin = await this.admSvc.registerAdmin(email.value, password.value);
      if(admin){
        console.log('Admin-->', admin);
        this.loading.dismiss();
        this.presentToast('Guardado con exito');
      }else{
        this.presentToast('No se pudo guardar');
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  private redirectAdmin(isVerified:boolean): void{
    if(isVerified){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }
/*
  async googleAdmin(email, password){
    try {
      const admin = await this.authSvc.adminloginGoogle();
      if(admin){
        //To do: Verivicar si el usuario verificó su Email
        const isVerified = this.authSvc.isEmailVerified(admin);
        console.log('Admin-->', admin);
        console.log('Verified-->', isVerified);
        const uid = await this.authSvc.getadminUid();
        console.log('uid-->',uid);
        this.redirectAdmin(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }
*/
  async guardarAdmin(){
    this.presentLoading();
    const path1 = 'Admins';
    const name = this.newAdmin.displayName;
    //const res = await this.storageService.uploadImage(this.newFile, path, name);
    //this.newAdmin.photo = res;
    this.frStore.createDoc(this.newAdmin, this.path1, this.newAdmin.uid).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }

  async deleteAdmin(admin: Admin){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Alerta',
      message: 'Seguro que desea <strong>eliminar</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.alertController.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.frStore.deleteDoc(this.path1, admin.uid).then(res => {
              this.loading.dismiss();
              //this.presentToast('Eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('Eliminado con Exito');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  getUsers(){
    this.frStore.getCollection<User>(this.path).subscribe(res => {
      this.users = res;
      console.log('Users-->', this.users);
      return res;
    })
  }

  getAdmins(){
    this.frStore.getCollection<Admin>(this.path1).subscribe(res => {
      this.admins = res;
      console.log('Admins-->', this.admins);
      return res;
    })
  }

  async deleteMascota(admin: Admin){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Alerta',
      message: 'Seguro que desea <strong>eliminar</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.alertController.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.frStore.deleteDoc(this.path1, admin.uid).then(res => {
              this.loading.dismiss();
              this.presentToast('Eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('No se pudo guardar');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  nuevo(){
    this.enableNewAdmin = true;
    this.newAdmin = {
      uid: this.frStore.getId(),
      displayName: '',
      email: '',
      emailVerified: null
    };
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando',
    });
    await this.loading.present();

  }

  async presentToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'light'
    });
    toast.present();
  }

  enable(){
    this.enableInfoAdmin = true;
  }
  enableUser(){
    this.enableInfoUser = true;
  }

  
}
