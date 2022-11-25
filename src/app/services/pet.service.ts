import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { Pet } from '../shared/pet.interface';
import { AuthService } from './auth.service';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  
  constructor(public petStore: AngularFirestore) {}

  //Método que registra mascotas
  createPet(data: any, path: string, id:string):Promise<void>{
    const collection = this.petStore.collection(path);
    return collection.doc(id).set(data);
  }
  //Método que nos muestra las mascotas registradas
  getPet(path: string, id:string){
    const collection = this.petStore.collection(path);
    return collection.doc(id).valueChanges();
  }
  //Método que elimina las mascotas registradas
  deletePet(path: string, id: string){
    const collection = this.petStore.collection(path);
    return collection.doc(id).delete();
  }
  //Método que actualiza la información de las mascotas
  updatePet(data: any,path: string, id: string){
    const collection = this.petStore.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    
    const id = this.petStore.createId();
    console.log('id-->', id);
    return id;
  }

  getCollection<tipo>(path: string){
    const collection = this.petStore.collection<tipo>(path);
    return collection.valueChanges();
  }
}
