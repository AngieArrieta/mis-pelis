import { Injectable } from '@angular/core';
import { Pelicula } from '../Models/Pelicula.model';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private peliculas: Pelicula[] = [];
  private PeliculasDummies: Pelicula[] = [
    {
      id: 1,
      nombre: 'Titanic',
      id_categoria: 1,
      precio: 2000,
      cantidad_inv: 10,

    },
    {
      id: 2,
      nombre: 'Son como niños',
      id_categoria: 3,
      precio: 4000,
      cantidad_inv: 2,

    },
    {
      id: 3,
      nombre: 'rapido y furiosos',
      id_categoria: 8,
      precio: 7000,
      cantidad_inv: 5,

    },
    {
      id: 4,
      nombre: 'cincuenta sombras de grey',
      id_categoria: 7,
      precio: 10000,
      cantidad_inv: 2,

    },
    {
      id: 5,
      nombre: 'jumanji',
      id_categoria: 9,
      precio: 8000,
      cantidad_inv: 3,

    },
    {
      id: 6,
      nombre: 'Feliz dia de mi muerte',
      id_categoria: 10,
      precio: 6500,
      cantidad_inv: 9,

    },
    {
      id: 7,
      nombre: 'Toy story 4',
      id_categoria: 6,
      precio: 12000,
      cantidad_inv: 4,

    },
    {
      id: 8,
      nombre: 'Coco',
      id_categoria: 6,
      precio: 12000,
      cantidad_inv: 10,

    }


  ];

  constructor() { }

  addPelicula(pelicula_nueva: Pelicula) {
    this.peliculas.push(pelicula_nueva);
  }

  getPeliculas() {
    return this.PeliculasDummies;
  }

  getPeliculasDinamicas() {
    return this.peliculas;
  }

  searchPeliculaById(id: string): Pelicula {

    let movie: Pelicula = null;

    for (const i of this.PeliculasDummies) {
      if (i.id == Number(id)) {
        movie = i;
      }
    }
    return movie;
  }

  updateInventarioByPelicula(peli: Pelicula, cantidad: number) {

    for (const pelicula of this.PeliculasDummies) {
      if (peli == pelicula) {
        pelicula.cantidad_inv = pelicula.cantidad_inv - cantidad;
      }
    }
  }


}
