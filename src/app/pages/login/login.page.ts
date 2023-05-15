import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
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
      //To do: Verificar si el usuario verificó su Email
      const isVerified = this.authSvc.isEmailVerified(user);
      if(isVerified){
        console.log('Verified-->', isVerified);
      }else
        console.log('Verified-->', isVerified);
        this.redirectUser(isVerified);
      } catch (error) {
      console.log('Error-->', error)
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
}

