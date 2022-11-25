import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Estetica } from 'src/app/shared/pet.interface';
import { ServiciosPage } from '../servicios/servicios.page';

@Component({
  selector: 'app-cita-estetica',
  templateUrl: './cita-estetica.page.html',
  styleUrls: ['./cita-estetica.page.scss'],
})
export class CitaEsteticaPage implements OnInit {
  
  opcion = '$';

  citas: Estetica[] = [];
  
  newEstetica: Estetica = {
    id: this.frStore.getId(),
    cantidad: null,
    servicio: null,
    mascota: '',
    perro: false,
    gato: false,
    ch: false,
    m: false,
    gd: false,
    enSucursal: false,
    aDomicilio: false,
    calle: '',
    numero: null,
    colonia: '',
    fechaCita: null,
    precio: this.opcion,
  }

  fecha;
  opcion2;

  enableNewcitaEstetica = false;
  enableInfocitaE = false;

  enableInfoTamano = false;
  enableDomicilio = false;
  enableCalendario = false;
  enablePrecio = false;
  enablePrecioM = false;
  enablePrecioGD = false;

  public path = 'citas-estetica';

  newImage = '';
  newFile = '';

  loading: any;

  constructor(public frStore: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public storageService: FirestorageService) { }

  ngOnInit() {
  }

  async saveCitaEstetica(){
    this.presentLoading();
    const path = 'citas-estetica/';
    const name = this.newEstetica.servicio;
    //const res = await this.storageService.uploadImage(this.newFile, path, name);
    //this.newSucursal.photo = res;
    this.frStore.createDoc(this.newEstetica, this.path, this.newEstetica.id).then(res => {
      this.loading.dismiss();
      this.selectPrecio(this.newEstetica.id);
      //this.opcion = this.selectPrecio(this.newEstetica.id);
      this.presentToast('Guardado con Exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }

  selectPrecio(id: string){
    const path = 'citas-estetica';
    this.frStore.getDoc<Estetica>(path, id).subscribe(res => {
      const ch = this.newEstetica.ch;
      const m = this.newEstetica.m;
      const gd = this.newEstetica.gd;
      if(ch){
        this.opcion2 = '$250.00';
        return this.opcion2;
      }else if(m){
        this.opcion2 = '$350.00';
        return this.opcion2;
      }else if(gd){
        this.opcion2 = '$500.00';
        return this.opcion2;
      }
      ;
    });
    return this.opcion2
  }

   //Alertas y toast
   async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando',
    });
    await this.loading.present();

  }

  cancelar(){
    this.newEstetica = {
      id: this.frStore.getId(),
    cantidad: null,
    servicio: null,
    mascota: '',
    perro: false,
    gato: false,
    ch: false,
    m: false,
    gd: false,
    enSucursal: false,
    aDomicilio: false,
    calle: '',
    numero: null,
    colonia: '',
    fechaCita: null,
    precio: this.selectPrecio(this.opcion),
    };
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
        //this.newEstetica.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  nuevo(){
    this.enableCalendario = true;
    
  }
  especie(){
    if(!this.enableInfoTamano){
      this.enableInfoTamano = true;
    }else{
      this.enableInfoTamano = false;
    }
  }
  cerrarespecie(){
    if(this.enableInfoTamano){
      this.enableInfoTamano = false;
    }
  }
  domicilio(){
    if(!this.enableDomicilio){
      this.enableDomicilio = true;
    }else{
      this.enableDomicilio = false;
    }
  }
  cerrardomicilio(){
    if(this.enableDomicilio){
      this.enableDomicilio = false;
    }
  }
  ch(){
    if(!this.enablePrecio){
      this.enablePrecio = true;
      this.enablePrecioM = false;
      this.enablePrecioGD = false;
    }else{
      this.enablePrecio = false;
    }
    
    
  }
  mm(){
    if(!this.enablePrecioM){
      this.enablePrecio = false;
      this.enablePrecioM = true;
      this.enablePrecioGD = false;
    }else{
      this.enablePrecioM = false;
    }
  }
  gd(){
    if(!this.enablePrecioGD){
      this.enablePrecio = false;
      this.enablePrecioM = false;
      this.enablePrecioGD = true;
    }else{
      this.enablePrecioGD = false;
    }
  }
  
  //Método para calendario sinDomingos
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
  
    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0;
  };
  cambioFecha(event){
    console.log('ionChange', event.detail.value);
    this.fecha = event.detail.value;
    return this.fecha;
  }
}

