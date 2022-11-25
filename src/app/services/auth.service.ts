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
/*
  user: User = {
    uid: '',
    name: '',
    email: '',
    photo: '',
    displayName: '',
    emailVerified: false,
  }
*/
  newFile: any;

//Propiedad
public user$: Observable<User>;
public admin$: Observable<Admin>;

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

    this.admin$ = this.afAuth.authState.pipe(
      switchMap((admin) => {
        if(admin){  //<-- Si tenemos un usuario logeado 
          return this.afStore.doc<Admin>(`admins/${admin.uid}`).valueChanges();
        }else{    //<-- Si no
          return of(null);  //retornamos un null en tipo Observable
        }
      })
    );

      this.getadminUid();
   }


//Método para resetear la contraseña
  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error-->', error);
    }
  }
//Método de inicio de sesión con Google
async loginGoogle(): Promise<User>{
  try {
    const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.updateUserData(user);
    this.getUid();
    return user;
  } catch (error) {
    console.log('Error-->', error);
  }
}
//Método de inicio de sesión con Google
async adminloginGoogle(): Promise<Admin>{
  try {
    const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const admin = user;
    this.updateAdminData(admin);
    this.getadminUid();
    return admin;
  } catch (error) {
    console.log('Error-->', error);
  }
}
//Método de inicio de sesión con Facebook
async loginFacebook(): Promise<User>{
  try {
    const { user } = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    this.updateUserData(user);
    return user;
  } catch (error) {
    console.log('Error-->', error);
  }
}
//Método de registro de usuarios
  async register(email:string, password:string): Promise<User>{
    try{
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
        await this.sendVerificationEmail();
        this.updateUserData(user);
        this.getUid();
        return user;
    }
    catch(error){
      console.log('Error-->', error);
    }
  }
  //Método de registro de usuarios
  async registerAdmin(email:string, password:string): Promise<User>{
    try{
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
        const admin = user;
        await this.sendVerificationEmail();
        this.updateAdminData(admin);
        this.getadminUid();
        return admin;
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
  isEmailVerified(user: User){
    return user.emailVerified === true ? true : false;
  }
//Método de Inicio de Sesión
  async login(email:string, password:string): Promise<User>{
    try{
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error-->', error);
    }
  }
  //Método de Inicio de Sesión
  async loginAdmin(email:string, password:string): Promise<User>{
    try{
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      const admin = user;
      this.updateAdminData(admin);
      return admin;
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

//Método 'POST' ingresa la información del usuario a la base de datos
  private updateUserData(user: User){
    const userRef:AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);

    const data:User = {
      uid:user.uid,
      email:user.email,
      //photo: user.photo,
      emailVerified:user.emailVerified,
      displayName:user.displayName
    };

    return userRef.set(data, {merge: true});
  }
//Método 'POST' ingresa la información del usuario a la base de datos
private updateAdminData(admin: Admin){
  const userRef:AngularFirestoreDocument<Admin> = this.afStore.doc(`admins/${admin.uid}`);

  const data:Admin = {
    uid:admin.uid,
    email:admin.email,
    emailVerified:admin.emailVerified,
    displayName:admin.displayName
  };

  return userRef.set(data, {merge: true});
}

/*
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
*/
//Método para obrener el id de un usuario
async getUid(){
  const user = await this.afAuth.currentUser;
  if(user === null){
    return null;
  }else{
    return user.uid;
  }
}
async getadminUid(){
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

