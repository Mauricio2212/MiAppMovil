import * as internal from "stream";
import { User } from "./user.interface";

export interface Pet {
    uid: string;
    namePet: string;
    breed: string;
    especie: string;
    age: number;
    photo: string;

}

export interface Promo {
    uid: string;
    namePromo: string;
    photo: string;
    sucursal: string;
    descripcion: string;
    vigencia: string;
    tel: number;
}

export interface Sucursal {
    id: string;
    sucursal: string;
    calle: string;
    numero: number;
    colonia: string;
    estado: string;
    tel: number;
    photo: string;
}

export interface Servicio {
    id: string;
    servicio: string;
    photo: string;
    icono: string;
}

export interface Cita {
    id: string;
    dueño: User;
    fecha: Date;
    citasEstetica: Estetica[];
}

export interface Estetica {
    id: string;
    cantidad: number;
    servicio: Servicio;
    mascota: string;
    perro: boolean;
    gato: boolean;
    ch: boolean;
    m: boolean;
    gd: boolean;
    enSucursal: boolean;
    aDomicilio: boolean;
    calle: string;
    numero: number;
    colonia: string;
    fechaCita: Date;
    precio: any;
}
