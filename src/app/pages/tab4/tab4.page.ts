import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { user } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
users: User[] = [];

public displayName;
public email;
public uid;
public data;
 
  public path = 'users/';
  loading: any;

  constructor(private authSvc:AuthService,
              private frStore:FirestoreService,
              private router: Router,
              public toastController: ToastController,
              public loadingController: LoadingController) {}
              ngOnInit() {
                //this.getUsers();
              }
                
/*
                this.authSvc.satateAuth().subscribe(res => {
                  console.log('User-->', res);
                  this.getUser(res);
                  if(res != null){ //<--- Si el usuario es diferente a nulo
                    const uid = res.uid;
                    this.getUserInfo(uid);
                    console.log('La respuesta es diferente a null');
                  }else{
                    //this.initUser();
                    console.log('la respuesta es nulla')
                  }
                });
              }

  
  
getUsers(){
  this.frStore.getCollection<User>(this.path).subscribe(res => {
    this.users = res;
    console.log('Users-->', this.users);
    return res;
  })
}

//obtener información del usuario
getUserInfo(uid: string){
  const path = 'users';
  this.frStore.getDoc<User>(path, uid).subscribe(res => {
    const user = res;
    return user;
  });
}

getUser(user){
  const data:User = {
    uid:user.uid,
    email:user.email,
    //photo: user.photo,
    emailVerified:user.emailVerified,
    displayName:user.displayName
  };
  console.log('Método mostrarUser-->',data);
   this.uid = data.uid;
   this.displayName = data.displayName;
   this.email = data.email;
   this.data = data;
  return data;
}
  
  onLogout(){
    console.log('logout');
    this.authSvc.logout();
    this.router.navigateByUrl('/login');
  }

  async presentToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'light'
    });
    toast.present();
  }

  
  async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando',
    });
    await this.loading.present();

  }
*/
}
