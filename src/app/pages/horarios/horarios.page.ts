import { Component, OnInit } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  fecha;
  enableNewDate = false;
  enableInfoDate = false;

  constructor() { }

  ngOnInit() {
    
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0;
  };

  obtenerfecha(fecha){
    console.log('Fecha-->', fecha)
  }

  cambioFecha(event){
    console.log('ionChange', event.detail.value);
    const fecha = event.detail.value;
    return fecha;
  }
  nuevo(){
    this.enableNewDate = true;
    
  }

}
