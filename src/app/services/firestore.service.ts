import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public frStore: AngularFirestore) { }

  //Método para registrar documentos en la bdd
  createDoc(data: any, path: string, id:string):Promise<void>{
    const collection = this.frStore.collection(path);
    return collection.doc(id).set(data);
  }
  //Método para obtener documentos de la bdd
  getDoc<tipo>(path: string, uid:string){
    const collection = this.frStore.collection<tipo>(path);
    console.log('Metodo get doc-->', uid);
    return collection.doc(uid).valueChanges();
  }
  //Método que elimina documentos de la bdd
  deleteDoc(path: string, id:string){
    const collection = this.frStore.collection(path);
    return collection.doc(id).delete();
  }
  //Método que actualiza Documentos en la bdd
  updateDoc(data: any, path: string, id: string){
    const collection = this.frStore.collection(path);
    return collection.doc(id).update(data);
  }
  //Método para obeter el id de un documento
  getId(){
    const id = this.frStore.createId();
    console.log('id-->',id);
    return id;
  }
  //Método para obtener una colleción de una bdd
  getCollection<tipo>(path:string){
    const collection = this.frStore.collection<tipo>(path);
    return collection.valueChanges();
  }
}
