import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Pet, Promo } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  promos: Promo[] = [];

  newPromo: Promo = {
    uid: this.frStore.getId(),
    namePromo: '',
    photo: '',
    sucursal: '',
    descripcion: '',
    vigencia: '',
    tel: null
  };

  enableNewPromo = false;
  enableInfoPromo = false;

  public path = 'Promos/';

  newImage = '';
  newFile = '';

  loading: any;

  constructor(public frStore: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public storageService: FirestorageService) { 
    
  }

  ngOnInit() {
    this.getPromo();
  }

  async savePromo(){
    this.presentLoading();
    const path = 'Promos/';
    const name = this.newPromo.namePromo;
    const res = await this.storageService.uploadImage(this.newFile, path, name);
    this.newPromo.photo = res;
    this.frStore.createDoc(this.newPromo, this.path, this.newPromo.uid).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con Exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }
 getPromo(){
  this.frStore.getCollection<Promo>(this.path).subscribe(res => {
    this.promos = res;
    console.log('Promo-->', this.promos);
    return res;
  });
 }
 async deletePromo(promo: Promo){
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
            //this.alertController.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.frStore.deleteDoc(this.path, promo.uid).then(res => {
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
  this.enableNewPromo = true;
  this.newPromo = {
    uid: this.frStore.getId(),
    namePromo: '',
    photo: '',
    sucursal: '',
    descripcion: '',
    vigencia: '',
    tel: null
  };
 }

 enable(){
  this.enableInfoPromo = true;
 }

  //Alertas y toast
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

  //Subir imagen
  async newImageUpload(event: any){
    
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newPromo.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
