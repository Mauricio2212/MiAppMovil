import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authSvc:AuthService, 
              public router:Router,
              public frStore:FirestoreService,
              public frStorage:FirestorageService,
              public admSvc:AdminService) { }

  ngOnInit() {}
  async onLogin(email, password){
    try {
      const user = await this.authSvc.login(email.value, password.value);
      const admin = await this.admSvc.loginAdmin(email.value, password.value);
      //To do: Verificar si el usuario verificó su Email
      const isVerified = this.authSvc.isEmailVerified(user);
      const isAdminVerified = true;
      if(isVerified){
        console.log('Verified-->', isVerified);
        this.redirectUser(isVerified);
      }else if (isAdminVerified){
        console.log('Admin Verified-->', isAdminVerified);
        this.redirectAdmin(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error)
    }
  }

  async onLoginGoogle(){
    try {
      const user = await this.authSvc.loginGoogle();
      if(user){
        //To do: Verivicar si el usuario verificó su Email
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('User-->', user);
        console.log('Verified-->', isVerified);
        this.redirectUser(isVerified);
        const uid = await this.authSvc.getUid();
        console.log('uid-->',uid);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  async onLoginFacebook(){
    try {
      const user = await this.authSvc.loginFacebook();
      if(user){
        //To do: Verivicar si el usuario verificó su Email
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('User-->', user);
        console.log('Verified-->', isVerified)
        this.redirectUser(isVerified);
        this.redirectAdmin(isVerified);
      }
    } catch (error) {
      console.log('Error-->', error);
    }
  }

  //Método para redireccionar al usuario
  private redirectUser(isVerified:boolean){
    if(isVerified){
      //redireccionar a tab1
      this.router.navigate(['tab1']);
    }else{
      //Enviar a página de verificación
      this.router.navigate(['verify-email']);
    }
  }

   //Método para redireccionar al admin
   private redirectAdmin(isVerified:boolean){
    if(isVerified){
      //redireccionar a tab1
      this.router.navigate(['home']);
    }else{
      //Enviar a página de verificación
      this.router.navigate(['home']);
    } 
  }
}
