import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Servicio } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-registrar-servicios',
  templateUrl: './registrar-servicios.page.html',
  styleUrls: ['./registrar-servicios.page.scss'],
})
export class RegistrarServiciosPage implements OnInit {

  servicios: Servicio[] = [];

  newServicio: Servicio = {
    id: this.frStore.getId(),
    servicio: '',
    photo: '',
    icono: ''
  };

  enableNewServicio = false;
  enableInfoServicio = false;

  public path = 'Servicios/';

  newImage = '';
  newFile = '';

  loading: any;

  constructor(public frStore: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public storageService: FirestorageService) { }

  ngOnInit() {
    this.getServicio();
  }

  async saveServicio(){
    this.presentLoading();
    const path = 'Servicios/';
    const name = this.newServicio.servicio;
    const res = await this.storageService.uploadImage(this.newFile, path, name);
    this.newServicio.photo = res;
    this.frStore.createDoc(this.newServicio, this.path, this.newServicio.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con Exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }

  getServicio(){
    this.frStore.getCollection<Servicio>(this.path).subscribe(res => {
      this.servicios = res;
      console.log('Servicio-->', this.servicios);
      return res;
    });
  }

  async deleteServicio(servicio: Servicio){
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
              this.frStore.deleteDoc(this.path, servicio.id).then(res => {
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
    this.enableNewServicio = true;
    this.newServicio = {
      id: this.frStore.getId(),
      servicio: '',
      photo: '',
      icono: ''
    };
  }

  enable(){
    this.enableInfoServicio = true;
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
  async newImageUpload(event){
    
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newServicio.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
      console.log('evento',event);
    }
  }  

  obtenerId(event){
    console.log('Id de Servicio-->', event);
   
    return event;
  }

}
