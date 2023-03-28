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

  newUser: User = {
    uid: '',
    name: '',
    email: '',
    photo: '',
    emailVerified: false,
    password: ''
  };

  newFile: any;

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
   const uid = await this.authSvc.getUid();
   console.log(uid);
    
  }

  async onRegister() {
    try {
      const credenciales = {
        email: this.newUser.email,
        password: this.newUser.password,
        emailVerified: this.newUser.emailVerified
      };
      const res = await this.authSvc.registrar(credenciales.email, credenciales.password);
      const uid = await this.authSvc.getUid();
      this.newUser.uid = uid;
      this.saveUser();
      this.redirectUser(credenciales.emailVerified);
      console.log(uid);
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  async saveUser(){
    const path = 'users';
    const name = this.newUser.name;
    if (this.newFile !== undefined){
      //Método para guardar imagen creado con capacitor (proximamemente)
    }
    this.frStore.createDoc(this.newUser, path, this.newUser.uid).then(res => {
      console.log('guardado con exito');
    }).catch( error => {});

  }

  salir() {
    this.authSvc.logout();
  }

  
  private redirectUser(isVerified:boolean): void{
    if(isVerified){
      this.router.navigate(['tab1']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }

}