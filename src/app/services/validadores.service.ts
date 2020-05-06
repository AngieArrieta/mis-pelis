import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';



@Injectable()


export class ValidadoresService {

  constructor() { }

  faltaApellido(control: FormControl): { [s: string]: boolean } {

    let valor = control.value.trim();
    if (valor.indexOf(' ') == -1) {
      return {
        faltaApellido: true
      }
    }
    return null;
  }
/*
  fechaMayorHoy(control: FormControl): { [s: string]: boolean } {
    let fecha_hoy = new Date ();
    if(control.value.getDate < fecha_hoy){
      return {
        fechaMayorHoy: true
      }
    }
    return null;
  }*/

  telefonoNoColombiano(control: FormControl): { [s: string]: boolean } {

    let valor = control.value.charAt(0);

    if (valor != '3') {
      return {
        telefonoNoColombiano: true
      }
    }

    return null;

  }

}
