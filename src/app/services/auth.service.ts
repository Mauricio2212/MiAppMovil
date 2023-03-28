import { Injectable } from '@angular/core';
import { Admin, User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth/public_api';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newFile: any;

  //Propiedad
  public user$: Observable<User>;

  constructor(public afAuth:AngularFireAuth, 
              private afStore:AngularFirestore
              ) {

                this.user$ = this.afAuth.authState.pipe(
                  switchMap((user) => {
                    if(user){  //<-- Si tenemos un usuario logeado 
                      return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
                    }else{    //<-- Si no
                      return of(null);  //retornamos un null en tipo Observable
                    }
                  })
                );

              }


//Método de registro de usuarios
registrar(email:string, password:string){
  return this.afAuth.createUserWithEmailAndPassword(email, password);
}

//Método para logear usuarios
login(email: string, password:string){
  return this.afAuth.signInWithEmailAndPassword(email, password);
}

//Método de cierre de sesión
logout(){
  return this.afAuth.signOut();
}

//Método para obrener el id de un usuario
async getUid(){
  const user = await this.afAuth.currentUser;
  if(user === null){
    return null;
  }else{
    return user.uid;
  }
}

  //Método de Verificación de Correo
async sendVerificationEmail(): Promise<void>{
  try {
    return (await this.afAuth.currentUser).sendEmailVerification();
  } catch (error) {
    console.log('Error-->', error)
  }
}
  //Método para comprobar que el Email esté verificado
  isEmailVerified(user: User){
    return user.emailVerified === true ? true : false;
  }

  //Método para resetear la contraseña
  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error-->', error);
    }
  }

}