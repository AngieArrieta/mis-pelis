import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { PeliculasService } from '../../services/peliculas.service';
import { ventasService } from '../../services/ventas.service';
import { CategoriaService } from '../../services/categorias.service';
import { Cliente } from '../../Models/Cliente.model';
import { Pelicula } from 'src/app/Models/Pelicula.model';
import { Venta } from '../../Models/Venta.model';
import { Categoria } from '../../Models/Categoria.model';
import { MatTableDataSource } from '@angular/material/table';
// graficas
import { ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';







@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  forma: FormGroup;

  clientes: Cliente[] = [];
  peliculas: Pelicula[] = [];
  ventas: Venta[] = [];
  categorias: Categoria[] = [];

  dataSource;
  displayedColumns: string[] = [];
  columnas: any[] = []; // para tablas dinamicas
  control = false; // para que se muestre
  tabla: any[] = []; // nueva tabla creada con la logica del negocip


  public labels: Label[] = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartOptions: any;
  public lineChartColors: Color[] = [];
  public legend = true;
  public lineChartType = 'line';

  public doughnutChartData: MultiDataSet;
  public doughnutChartType = 'doughnut';



  nombresReportes: any[] = [{ valor: 1, valorMostrado: 'Numero de ventas por mes' },
  { valor: 2, valorMostrado: 'Numero de peliculas por categoria en inventario' },
  { valor: 3, valorMostrado: 'Numero de peliculas vendidas por categoria' },
  { valor: 4, valorMostrado: 'Edad promedio de ventas por categoria' },
  { valor: 5, valorMostrado: 'Numero de ventas por categoria y total recaudado' }];

  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private _peliculasService: PeliculasService, private _ventasService: ventasService, private _categoriaService: CategoriaService) {
    this.crearFormulario();
    this.clientes = this._clientesService.getClientes();
    this.peliculas = this._peliculasService.getPeliculas();
    this.ventas = this._ventasService.getVentas();
    this.categorias = this._categoriaService.getCategorias();

    console.log(this.clientes);
    console.log(this.peliculas);
    console.log(this.ventas);
    console.log(this.categorias);
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.forma = this.fb.group({ // nombres del form
      selectReporte: ['', Validators.required]
    });
  }

  generarReporte() {
    if (this.forma.get('selectReporte').valid) {
      switch (this.forma.get('selectReporte').value) {
        case 1: this.caso1(); break;
        case 2: this.caso2(); break;
        case 3: this.caso3(); break;
        case 4: this.caso4(); break;
        case 5: this.caso5(); break;
      }
    }
  }

  caso1() {

    this.control = true;
    this.tabla = [];
    this.displayedColumns = [];

    let meses = ['Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'];

    let ventas: number[] = [];

    for (let i = 0; i <= 11; i++) {
      let cont = 0;
      for (const venta of this.ventas) {
        if (venta.fecha.getMonth() == i) {
          cont += 1;
        }
      }
      ventas[i] = cont;

      this.tabla.push({ mes: meses[i], nVentas: cont });

    }

    for (let i = 0; i < Object.keys(this.tabla[0]).length; i++) {
      this.displayedColumns.push(Object.keys(this.tabla[0])[i]);
    }

    this.dataSource = new MatTableDataSource(this.tabla);

    this.columnas = [
      { titulo: 'Meses', valor: 'mes' },
      { titulo: 'Numero de ventas', valor: 'nVentas' }
    ];

    console.log(ventas)

    // graficas lineas

    this.lineChartData = [{ data: ventas, label: '# Ventas' }];
    this.labels = meses;
    this.lineChartOptions = { responsive: true }
    this.lineChartColors = [{
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // grafica de dona

    this.doughnutChartData = [ventas];

  }


  caso2() {

    this.control = true;
    this.tabla = [];
    this.displayedColumns = [];


    let categoriasName: string[] = []; // para los labels de la tabla

    for (const categoria of this.categorias) {
      categoriasName.push(categoria.nombre);
    }


    let nPeliculas: number[] = [];

    for (const categoria of this.categorias) {
      let acu = 0;
      for (const pelicula of this.peliculas) {
        if (categoria.id == pelicula.id_categoria) {
          acu = acu + pelicula.cantidad_inv;
        }
      }
      nPeliculas.push(acu); // para la data de las graficas
      this.tabla.push({ categoria: categoria.nombre, nPeliculas: acu });
    }


    for (let i = 0; i < Object.keys(this.tabla[0]).length; i++) {
      this.displayedColumns.push(Object.keys(this.tabla[0])[i]);
    }

    this.dataSource = new MatTableDataSource(this.tabla);

    this.columnas = [
      { titulo: 'Categorias', valor: 'categoria' },
      { titulo: 'Numero de peliculas en inventario', valor: 'nPeliculas' }
    ];


    // graficas lineas

    this.lineChartData = [{ data: nPeliculas, label: '# peliculas' }];
    this.labels = categoriasName;
    this.lineChartOptions = { responsive: true }
    this.lineChartColors = [{
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // grafica de dona

    this.doughnutChartData = [nPeliculas];

  }

  caso3() {
    this.control = true;
    this.tabla = [];
    this.displayedColumns = [];

    let categoriasName: string[] = []; // para los labels de la tabla

    for (const categoria of this.categorias) {
      categoriasName.push(categoria.nombre);
    }


    let nVentas: number[] = [];

    for (const categoria of this.categorias) {
      let acu = 0;
      for (const venta of this.ventas) {
        for (const pelicula of this.peliculas) {
          if (venta.idPelicula == pelicula.id) {
            if (categoria.id == pelicula.id_categoria) {
              acu = acu + venta.cantidadPeliculas;
            }
          }
        }
      }
      nVentas.push(acu); // para la data de las graficas
      this.tabla.push({ categoria: categoria.nombre, nVentas: acu });
    }



    for (let i = 0; i < Object.keys(this.tabla[0]).length; i++) {
      this.displayedColumns.push(Object.keys(this.tabla[0])[i]);
    }

    this.dataSource = new MatTableDataSource(this.tabla);

    this.columnas = [
      { titulo: 'Categorias', valor: 'categoria' },
      { titulo: 'Numero de peliculas vendidas', valor: 'nVentas' }
    ];


    // graficas lineas

    this.lineChartData = [{ data: nVentas, label: '# peliculas' }];
    this.labels = categoriasName;
    this.lineChartOptions = { responsive: true }
    this.lineChartColors = [{
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // grafica de dona

    this.doughnutChartData = [nVentas];
  }

  caso4() {
    this.control = true;
    this.tabla = [];
    this.displayedColumns = [];


    let categoriasName: string[] = []; // para los labels de la tabla

    for (const categoria of this.categorias) {
      categoriasName.push(categoria.nombre);
    }



    let edadPromedio: number[] = [];

    for (const categoria of this.categorias) {
      let acu = 0;
      let cont = 0;
      let prom: any = 0;
      for (const venta of this.ventas) {
        for (const pelicula of this.peliculas) {
          for (const cliente of this.clientes) {
            if (venta.idPelicula == pelicula.id) {
              if (pelicula.id_categoria == categoria.id) {
                if (venta.idCliente == cliente.id) {
                  acu += cliente.edad;
                  cont += 1;
                }
              }
            }
          }
        }
      }


      prom = acu / cont;
      prom = Math.trunc(prom);

      if (isNaN(prom)) {
        prom = 0;
      }
      edadPromedio.push(prom); // para la data de las graficas
      this.tabla.push({ categoria: categoria.nombre, edadPromedio: prom });
    }


    for (let i = 0; i < Object.keys(this.tabla[0]).length; i++) {
      this.displayedColumns.push(Object.keys(this.tabla[0])[i]);
    }

    this.dataSource = new MatTableDataSource(this.tabla);

    this.columnas = [
      { titulo: 'Categorias', valor: 'categoria' },
      { titulo: 'Edad promedio en ventas', valor: 'edadPromedio' }
    ];


    // graficas lineas

    this.lineChartData = [{ data: edadPromedio, label: '# peliculas' }];
    this.labels = categoriasName;
    this.lineChartOptions = { responsive: true }
    this.lineChartColors = [{
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // grafica de dona

    this.doughnutChartData = [edadPromedio];
  }

  caso5() {

    this.control = true;
    this.tabla = [];
    this.displayedColumns = [];


    let categoriasName: string[] = []; // para los labels de la tabla

    for (const categoria of this.categorias) {
      categoriasName.push(categoria.nombre);
    }


    let nVentas: number[] = [];
    let totalRecaudado : number [] = [];

    for (const categoria of this.categorias) {
      let cont = 0;
      let total = 0;
      for (const venta of this.ventas) {
        for (const pelicula of this.peliculas) {
          if(venta.idPelicula == pelicula.id){
            if (categoria.id == pelicula.id_categoria) {
              cont+=1;
              total+=venta.valorTotal;
            }
          }
        }
      }
      nVentas.push(cont);
      totalRecaudado.push(total); // para la data de las graficas
      this.tabla.push({ categoria: categoria.nombre, nVentas: cont, totalRecaudado: total });
    }

    // DEFINIENDO EL DISPLAYEDCOLUMS DINAMICO
    for (let i = 0; i < Object.keys(this.tabla[0]).length; i++) {
      this.displayedColumns.push(Object.keys(this.tabla[0])[i]);
    }

    this.dataSource = new MatTableDataSource(this.tabla);
    this.columnas = [
      { titulo: 'Categorias', valor: 'categoria' },
      { titulo: 'Numero de ventas', valor: 'nVentas' },
      { titulo: 'Total Recaudado', valor: 'totalRecaudado' }
    ];


    // graficas lineas

    this.lineChartData = [{ data: nVentas, label: '# ventas' }];
    this.labels = categoriasName;
    this.lineChartOptions = { responsive: true }
    this.lineChartColors = [{
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // grafica de dona

    this.doughnutChartData = [nVentas, totalRecaudado];
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}

