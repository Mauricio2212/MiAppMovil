import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Promo } from 'src/app/shared/pet.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  promos: Promo[] = [];

  enableNewPromo = false;

  private path = 'Promos/';

  constructor(public frStore: FirestoreService,
              ) {}

  ngOnInit(){
    this.loadPromos();
  }

  loadPromos(){
    this.frStore.getCollection<Promo>(this.path).subscribe(res => {
      console.log(res);
      this.promos = res;
    });
  }
}
