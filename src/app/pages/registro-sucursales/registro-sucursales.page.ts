import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Sucursal } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-registro-sucursales',
  templateUrl: './registro-sucursales.page.html',
  styleUrls: ['./registro-sucursales.page.scss'],
})
export class RegistroSucursalesPage implements OnInit {

  sucursales: Sucursal[] = [];

  newSucursal: Sucursal = {
    id: this.frStore.getId(),
    sucursal: '',
    calle: '',
    numero: null,
    colonia: '',
    estado: '',
    tel: null,
    photo: ''
  };

  enableNewSucursal = false;
  enableInfoSucursal = false;

  public path = 'Sucursales/';

  newImage = '';
  newFile = '';

  loading: any;
  
  constructor(public frStore: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public storageService: FirestorageService) { }

  ngOnInit() {
    this.getSucursal();
  }

  async saveSucursal(){
    this.presentLoading();
    const path = 'Promos/';
    const name = this.newSucursal.sucursal;
    const res = await this.storageService.uploadImage(this.newFile, path, name);
    this.newSucursal.photo = res;
    this.frStore.createDoc(this.newSucursal, this.path, this.newSucursal.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con Exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }
 getSucursal(){
  this.frStore.getCollection<Sucursal>(this.path).subscribe(res => {
    this.sucursales = res;
    console.log('Promo-->', this.sucursales);
    return res;
    });
  }
  async deletePromo(sucursal: Sucursal){
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
              this.frStore.deleteDoc(this.path, sucursal.id).then(res => {
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
    this.enableNewSucursal = true;
    this.newSucursal = {
      id: this.frStore.getId(),
      sucursal: '',
      calle: '',
      numero: null,
      colonia: '',
      estado: '',
      tel: null,
      photo: ''
      
    };
   }

   enable(){
    this.enableInfoSucursal = true;
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
        this.newSucursal.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
