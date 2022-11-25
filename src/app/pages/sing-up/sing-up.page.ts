import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
/*
  user: User = {
    uid: '',
    name: '',
    email: '',
    photo: '',
    displayName: '',
    emailVerified: false,
    password: ''
  }

  newFile: any;
  loading: any;

  uid = '';
*/
  constructor(public authSvc:AuthService, 
              private router:Router,
              public frStore:FirestoreService,
              public frStorage:FirestorageService,
              public admSvc: AdminService) {}
/*
                this.authSvc.satateAuth().subscribe(res => {
                  console.log(res);
                  if(res != null){ //<--- Si el usuario es diferente a nulo
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                    console.log('La respuesta es diferente a null')
                  }else{
                    this.initUser();
                    console.log('la respuesta es nulla')
                  }
                });
              
*/
  async ngOnInit() {
   
    
  }

 

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User-->', user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }
  
  async registerAdmin(email, password) {
    try {
      const admin = await this.admSvc.registerAdmin(email.value, password.value);
      if(admin){
        console.log('Admin-->', admin);
        const isVerified = this.authSvc.isEmailVerified(admin);
        this.redirectAdmin(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  async onLoginGoogle(email, password){
    try {
      const user = await this.authSvc.loginGoogle();
      if(user){
        //To do: Verivicar si el usuario verificó su Email
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('User-->', user);
        console.log('Verified-->', isVerified);
        const uid = await this.authSvc.getUid();
        console.log('uid-->',uid);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  private redirectUser(isVerified:boolean): void{
    if(isVerified){
      this.router.navigate(['tab1']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }

  private redirectAdmin(isVerified:boolean): void{
    if(isVerified){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }
  
}
/*
initUser(){
  this.uid = '';
  this.user = {
    uid: '',
    name: '',
    email: '',
    photo: '',
    displayName: '',
    emailVerified: false,
    password: ''
  };
  console.log(this.user);
}

  async registrarse(){
    const credenciales = {
      email: this.user.email,
      password: this.user.password
    };
    const res = await this.authSvc.registrar(credenciales.email, credenciales.password).catch(error => {
      console.log('error-->', error);
    });
    
    const uid = await this.authSvc.getUid();
    this.user.uid = uid;
    this.guardarUser();
    console.log(uid);
    this.router.navigate(['/login']);
  }

  async guardarUser(){
    const path = 'users';
    const name = this.user.name;
    if(this.newFile != undefined){
      const res = await this.frStorage.uploadImage(this.newFile, path, name);
      this.user.photo = res;
    }
    this.frStore.createDoc(this.user, path, this.user.uid).then(res => {
      //this.loading.dismiss();
      console.log('guardado con exito');
    }).catch(error => {
      console.log('error-->', error);
    });
  }

  async  ingresar(){
    const credenciales = {
      email: this.user.email,
      password: this.user.password
    };
    this.authSvc.login(credenciales.email, credenciales.password).then(res => {
      console.log('Ingreso exitoso');
      this.router.navigate(['/tab1']);
    });
  }


  async salir(){
    this.authSvc.logout();
    /*
    const uid = await this.authSvc.getUid();
    console.log(uid);
    */
   /*
  }

  getUserInfo(uid: string){
    const path = 'users';
    this.frStore.getDoc<User>(path, uid).subscribe(res => {
      this.user = res;
    });
  }*/

