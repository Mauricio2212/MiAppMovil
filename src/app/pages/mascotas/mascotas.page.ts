import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/shared/pet.interface';
import { RegistrarMascotaPage } from '../registrar-mascota/registrar-mascota.page';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

@Input() pet: Pet;

  

  constructor(public petsDB: PetService, 
              private router: Router) { }


  ngOnInit() {
   console.log('La mascota es-->', this.pet);
  }

  addMascota(){
    
  }
 
  
  
}
