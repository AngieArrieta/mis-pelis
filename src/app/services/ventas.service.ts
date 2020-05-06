import { Injectable } from '@angular/core';
import { Venta } from '../Models/Venta.model';

@Injectable()
export class ventasService {

private ventas: Venta [] = [];
private ventasDummies: Venta [] = [
  {
    idCliente: 1,
    idPelicula: 1,
    cantidadPeliculas: 4,
    valorTotal: 8000,
    fecha: new Date (2019, 1, 20)
  },
  {
    idCliente: 2,
    idPelicula: 4,
    cantidadPeliculas: 2,
    valorTotal: 20000,
    fecha: new Date (2019, 1, 25)
  },
  {
    idCliente: 5,
    idPelicula: 2,
    cantidadPeliculas: 1,
    valorTotal: 4000,
    fecha: new Date (2019, 3, 14)
  },
  {
    idCliente: 6,
    idPelicula: 1,
    cantidadPeliculas: 2,
    valorTotal: 4000,
    fecha: new Date (2019, 5, 5 )
  },
  {
    idCliente: 3,
    idPelicula: 2,
    cantidadPeliculas: 1,
    valorTotal: 4000,
    fecha: new Date (2019, 6, 4 )
  },
  {
    idCliente: 1,
    idPelicula: 6,
    cantidadPeliculas: 9,
    valorTotal: 58500,
    fecha: new Date (2019, 6, 23 )
  },
  {
    idCliente: 2,
    idPelicula: 1,
    cantidadPeliculas: 4,
    valorTotal: 8000,
    fecha: new Date (2019, 6, 28 )
  },
  {
    idCliente: 6,
    idPelicula: 3,
    cantidadPeliculas: 3,
    valorTotal: 21000,
    fecha: new Date (2019, 7, 4)
  },
  {
    idCliente: 1,
    idPelicula: 3,
    cantidadPeliculas: 2,
    valorTotal: 14000,
    fecha: new Date (2019, 7, 19 )
  },
  {
    idCliente: 5,
    idPelicula: 5,
    cantidadPeliculas: 2,
    valorTotal: 16000,
    fecha: new Date (2019, 8 , 11 )
  },
  {
    idCliente: 4,
    idPelicula: 5,
    cantidadPeliculas: 1,
    valorTotal: 8000,
    fecha: new Date (2019, 9 , 28 )
  },
  {
    idCliente: 6,
    idPelicula: 7,
    cantidadPeliculas: 1,
    valorTotal: 12000,
    fecha: new Date (2019, 11, 1)
  },
  {
    idCliente: 1,
    idPelicula: 7,
    cantidadPeliculas: 2,
    valorTotal: 24000,
    fecha: new Date (2019, 11, 13 )
  },
  {
    idCliente: 2,
    idPelicula: 7,
    cantidadPeliculas: 1,
    valorTotal: 12000,
    fecha: new Date (2019, 11, 20 )
  }
];

getVentas(){
   // return this.ventas;
  return this.ventasDummies;
}

guardarVenta(venta: Venta){
this.ventas.push(venta);
}

}