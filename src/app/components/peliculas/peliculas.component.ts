import { Component, OnInit, ViewChild } from '@angular/core';
import { Pelicula } from '../../Models/Pelicula.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../services/categorias.service';
import { Categoria } from 'src/app/Models/Categoria.model';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  forma: FormGroup;
  peliculaAux: Pelicula;
  peliculas: Pelicula[] = [];
  dataSource;
  categoriasObjects: Categoria[] = [];
  categoriaNombres: string[] = [];
  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'cantidad']; // nombres del form
  // @ViewChild('formPeliculas') formPeliculas: NgForm;


  constructor(private fb: FormBuilder, private _peliculasService: PeliculasService, private _categoriasService: CategoriaService) {
    this.crearFormulario();
    this.peliculas = this._peliculasService.getPeliculasDinamicas();

    // obteniendo categorias
    this.categoriasObjects = this._categoriasService.getCategorias();
    for (const cat of this.categoriasObjects) {
      this.categoriaNombres.push(cat.nombre);
      this.categoriaNombres.sort();
    }
  }

  ngOnInit() {
  }

  crearFormulario() {

    this.forma = this.fb.group({ // nombres del form
      nombre: ['', [Validators.required]],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });

  }



  guardar() {

    if (this.forma.valid) {

      // posteo de info

      this.peliculaAux = new Pelicula();
      this.peliculaAux.nombre = this.forma.value.nombre;
      this.peliculaAux.id_categoria = this.forma.value.id_categoria;
      this.peliculaAux.precio = this.forma.value.precio;
      this.peliculaAux.cantidad_inv = this.forma.value.cantidad;


      this._peliculasService.addPelicula(this.peliculaAux);
      this.dataSource = new MatTableDataSource(this.peliculas);

      // reset
      this.forma.reset({ // valor completo
        nombre: '',
        id_categoria: '',
        precio: '',
        cantidad_inv: '',
        to_adult: '1'
      });
     // this.formPeliculas.resetForm();



    } else {
      // para que toque todos los campos y salga error
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }


  }


}
