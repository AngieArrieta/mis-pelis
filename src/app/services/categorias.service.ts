import { Injectable } from '@angular/core';
import { Categoria } from '../Models/Categoria.model';

@Injectable()
export class CategoriaService {

private categorias: Categoria [] = [

{
    id : 1,
    nombre: 'Romantica familiar',
    restriccion_edad: 7
},
{
    id : 2,
    nombre: 'Romantica para adultos',
    restriccion_edad: 18
},
{
    id : 3,
    nombre: 'Comedia familiar',
    restriccion_edad: 7
},
{
    id : 4,
    nombre: 'Comedia explicita',
    restriccion_edad: 16
},
{
    id : 5,
    nombre: 'Super Heroes',
    restriccion_edad: 14
},
{
    id : 6,
    nombre: 'Animada',
    restriccion_edad: 7
},
{
    id : 7,
    nombre: 'Erotica',
    restriccion_edad: 18
},
{
    id : 8,
    nombre: 'Accion',
    restriccion_edad: 10
},
{
    id : 9,
    nombre: 'Aventura',
    restriccion_edad: 10
},
{
    id : 10,
    nombre: 'Suspenso',
    restriccion_edad: 14
},
{
    id : 11,
    nombre: 'terror',
    restriccion_edad: 14
},

];

getCategorias() : Categoria[]{
    return this.categorias;
}

searchCategoriaById(id: number): Categoria{

    let cat: Categoria = null;

    for (const i of this.categorias) {
      if (i.id == id) {
        cat = i;
      }
    }
    return cat;
}

}