import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Sucursal } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {
  sucursales: Sucursal[] = [];
  
  enableNewSucursal = false;

  private path = 'Sucursales/';

  constructor(public frStore: FirestoreService) { }

  ngOnInit() {
    this.loadSucursales();
  }

  loadSucursales(){
    this.frStore.getCollection<Sucursal>(this.path).subscribe(res => {
      console.log(res);
      this.sucursales = res;
    });
  }


}
