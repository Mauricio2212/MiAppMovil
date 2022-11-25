import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public fireStorage: AngularFireStorage) { }

  uploadImage(file: any, path: string, name: string): Promise<string>{
    return new Promise(resolve => {
      
      const filePath = path + '/' + name;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      ).subscribe();
      
        
    });
  }
}
