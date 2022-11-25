import { Injectable } from '@angular/core';
import { Admin } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

//Propiedad
public admin$: Observable<Admin>;

  constructor(public afAuth:AngularFireAuth, 
              private afStore:AngularFirestore
              ) {

    this.admin$ = this.afAuth.authState.pipe(
      switchMap((admin) => {
        if(admin){  //<-- Si tenemos un usuario logeado 
          return this.afStore.doc<Admin>(`admins/${admin.uid}`).valueChanges();
        }else{    //<-- Si no
          return of(null);  //retornamos un null en tipo Observable
        }
      })
    );

      this.getUid();
   }


//Método para resetear la contraseña
  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error-->', error);
    }
  }
//Método de registro de usuarios
  async registerAdmin(email:string, password:string): Promise<Admin>{
    try{
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
        await this.sendVerificationEmail();
        this.updateAdminData(user);
        this.getUid();
        return user;
    }
    catch(error){
      console.log('Error-->', error);
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
  isEmailVerified(user: Admin){
    return user.emailVerified === true ? true : false;
  }
//Método de Inicio de Sesión
  async loginAdmin(email:string, password:string): Promise<Admin>{
    try{
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateAdminData(user);
      return user;
    }
    catch(error){
      console.log('Error-->', error);
    }
  }
//Método de cierre de Sesión
  async logout(): Promise<void>{
    try{
      await this.afAuth.signOut();
    }
    catch(error){
      console.log('Error-->', error);
    }
  }

//Método 'POST' ingresa la información del admin en la bdd
private updateAdminData(admin: Admin){
  const userRef:AngularFirestoreDocument<Admin> = this.afStore.doc(`admins/${admin.uid}`);

  const data:Admin = {
    uid:admin.uid,
    email:admin.email,
    emailVerified: true,
    displayName:admin.displayName
  };

  return userRef.set(data, {merge: true});
}

//Método para obrener el id de un usuario
async getUid(){
  const admin = await this.afAuth.currentUser;
  if(admin === null){
    return null;
  }else{
    return admin.uid;
  }
}

//Método de estado de autenticación
satateAuth(){
  return this.afAuth.authState;
}

}
