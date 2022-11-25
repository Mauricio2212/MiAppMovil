import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/shared/pet.interface';


@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.page.html',
  styleUrls: ['./registrar-mascota.page.scss'],
})
export class RegistrarMascotaPage implements OnInit {

pets: Pet[] = [];


newPet: Pet = {
  uid: this.petsDB.getId(),
  namePet: '',
  breed: '',
  especie: '',
  age: null,
  photo: ''

};

enableNewPet = false;
enableInfoPet = false;

public path = 'Mascotas/';


newImage = '';
newFile = '';

loading: any;

  constructor(public petsDB: PetService, 
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              private storageService: FirestorageService) { }

  ngOnInit() {
    this.getMascotas();
  }

 async guardarMascota(){
    this.presentLoading();
    const path = 'Mascotas';
    const name = this.newPet.namePet;
    const res = await this.storageService.uploadImage(this.newFile, path, name);
    this.newPet.photo = res;
    this.petsDB.createPet(this.newPet, this.path, this.newPet.uid).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(errpr => {
      this.presentToast('No se pudo guardar');
    });
  }

  getMascotas(){
    this.petsDB.getCollection<Pet>(this.path).subscribe(res => {
      this.pets = res;
      console.log('Pet-->', this.pets)
      return res;
    });
  }

  async deleteMascota(pet: Pet){
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
            this.petsDB.deletePet(this.path, pet.uid).then(res => {
              this.loading.dismiss();
              this.presentToast('Eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('Eliminado con exito');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  nuevo(){
    this.enableNewPet = true;
    this.newPet = {
      uid: this.petsDB.getId(),
      namePet: '',
      breed: '',
      especie: '',
      age: null,
      photo: ''
    };
  }

  enable(){
    this.enableInfoPet = true;
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

  async newImageUpload(event: any){
    
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newPet.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  

 
}
