import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Servicio } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicios: Servicio[] = [];

  enableNewServicio = false;

  private path = 'Servicios/';

  constructor(public frStore: FirestoreService,
              public router: Router,
              public authSvc: AuthService) {}

  ngOnInit() {
    this.loadServicios();
  }

  loadServicios(){
    this.frStore.getCollection<Servicio>(this.path).subscribe(res => {
      console.log('loadServicios-->',res);
      this.servicios = res;
    });
  }


  loadCita(){
    this.router.navigate(['cita-estetica']);
  }

  

}
