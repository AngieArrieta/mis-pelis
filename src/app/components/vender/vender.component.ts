import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Pelicula } from '../../Models/Pelicula.model';
import { Cliente } from 'src/app/Models/Cliente.model';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../Models/Categoria.model';
import { CategoriaService } from '../../services/categorias.service';
import { Venta } from '../../Models/Venta.model';
import { ventasService } from '../../services/ventas.service';




@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {


  forma: FormGroup;
  clienteAux: Cliente;
  peliculaAux: Pelicula;
  total: number;
  cantidadPelisAux: number;
  categoriaPelisAux: Categoria;
  nombrePelisAux: string;
  showModal: boolean;
  cantidadTotal: number;
  venta: Venta;
  ventasLista: Venta[] = []; // mostrar json en el html

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private _peliculasService: PeliculasService, private toastr: ToastrService, private _categoriaService :  CategoriaService, private _ventasService: ventasService) {
    this.crearFormulario();
    this.ventasLista = this._ventasService.getVentas();
    // this.listener();

  }

  ngOnInit() {
  }

  crearFormulario() { // nombres del form

    this.forma = this.fb.group({
      id_cliente: ['', [Validators.required]],
      nombre_cliente: [''],
      id_pelicula: ['', [Validators.required]],
      nombre_pelicula: [''],
      cantidad: ['1', [Validators.required, Validators.min(1)]]
    });
  }




  /*listener(){
    this.forma.get('id_cliente').valueChanges.subscribe( valor => {
      console.log(valor);
      this.id = valor;
      console.log(this.id);
     });
  }*/


  // funcion llamada por enter del campo id_cliente

  buscarCliente(id: string) {


    this.clienteAux = this._clientesService.searchClienteById(id);

    if (this.clienteAux != null) {
      this.forma.get('nombre_cliente').setValue(this.clienteAux.nombre);
    } else {
      this.toastr.error('No se encontro cliente', 'Error de Busqueda', {
        timeOut: 3000
      });
      this.clienteAux = null; // por si se hace despues de haber generado un cliente
      this.forma.get('id_cliente').reset();
      this.forma.get('nombre_cliente').reset();
    }



    // mientras aprendo a bloquear condicionando
    this.modalFuncion();
  }


  // funcion llamada por enter del campo id_pelicula

  buscarPelicula(id: string) {

    this.peliculaAux = this._peliculasService.searchPeliculaById(id);

    if (this.peliculaAux != null) {
      this.cantidadPelisAux = this.peliculaAux.cantidad_inv;
      this.forma.get('nombre_pelicula').setValue(this.peliculaAux.nombre);
      this.forma.get('cantidad').setValidators([Validators.max(this.cantidadPelisAux)]);
      this.categoriaPelisAux = this._categoriaService.searchCategoriaById(this.peliculaAux.id_categoria);

    } else {
      this.toastr.error('No se encontro Pelicula', 'Error de Busqueda', {
        timeOut: 3000
      });
      this.peliculaAux = null; // por si se hace despues de haber generado un pelicula
      this.forma.get('id_pelicula').reset();
      this.forma.get('nombre_pelicula').reset();
    }

    // ---- showModal -----

    this.modalFuncion();

    // si no hay inventario
    if (this.cantidadPelisAux == 0) {

      this.forma.get('id_pelicula').reset();
      this.forma.get('nombre_pelicula').reset();
      this.toastr.info('La pelicula "' + this.peliculaAux.nombre + '" esta agotada', 'Pelicula Agotada', {
        timeOut: 5000
      });
      this.peliculaAux = null;
    }

  }


  modalFuncion() {

    if (this.clienteAux.edad < this.categoriaPelisAux.restriccion_edad) {
      this.nombrePelisAux = this.peliculaAux.nombre;
      this.peliculaAux = null;
      this.showModal = true;
      this.forma.get('id_pelicula').reset();
      this.forma.get('nombre_pelicula').reset();
    } else {
      this.showModal = false;
    }

  }

  // funcion llamada desde el click de cancerlar

  reset() {
    this.forma.reset();
    this.total = null;
    this.clienteAux = null;
    this.peliculaAux = null;
  }


  // funcion llamada desde el click de vender
  vender() {


    if (this.forma.valid && this.forma.get('cantidad').dirty && this.forma.get('cantidad').valid && this.total != null) {


      // descontar inventario
      this._peliculasService.updateInventarioByPelicula(this.peliculaAux, this.forma.get('cantidad').value);

      this.toastr.success('', 'Venta Exitosa', {
        timeOut: 3000
      });


      // posteo de info
      this.venta = new Venta();

      this.venta.idCliente = this.clienteAux.id;
      this.venta.idPelicula = this.peliculaAux.id;
      this.venta.cantidadPeliculas = this.cantidadTotal;
      this.venta.valorTotal = this.total;
      this.venta.fecha = new Date();

      this._ventasService.guardarVenta(this.venta);


      // resetear campos
      this.reset();
    }


  }


  calcularTotal(cantidad: string) {
    this.cantidadTotal = Number(cantidad);
    if (this.forma.get('cantidad').valid) {
      this.total = this.peliculaAux.precio * this.cantidadTotal;
    }
  }

}
