import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../Models/Cliente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  forma: FormGroup;
  cliente_aux: Cliente;
  clientes: Cliente [] = [];
  dataSource;
  displayedColumns:string[] = ['nombre', 'fecha', 'genero', 'email', 'telefono'];


  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private _validadoresService: ValidadoresService) {
    this.crearFormulario();
    this.loadDataToForm();
    this.clientes = this._clientesService.getClientesDinamicos();

  }

  ngOnInit() {

  }

  // forma de obtener propiedar, procesar info


  crearFormulario() {
    this.forma = this.fb.group({// definir formulario

      // tslint:disable-next-line: max-line-length
      // [ valor por defecto, validaciones sincronos ( no necesitan de algo de afuera y se ejecuta en el mismo hilo de tiempo), validaciones asincronas ]

      nombre: ['', [Validators.required, this._validadoresService.faltaApellido]],
      fecha_nac: ['', Validators.required],
      genero: ['1', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required, Validators.minLength(10), this._validadoresService.telefonoNoColombiano]]

    });
  }


  // funcion para cargar data
  loadDataToForm() {
    this.forma.setValue({ // valor completo
      nombre: '',
      fecha_nac: '',
      genero: '1',
      email: '',
      telefono: ''
    });
  }

  guardar() { // no se recibe forma porque ya la tengo




    if (this.forma.valid) {



      // posteo de info

      this.cliente_aux = new Cliente();
      this.cliente_aux.nombre = this.forma.value.nombre;
      this.cliente_aux.fecha = this.forma.value.fecha_nac;
      this.cliente_aux.genero = this.forma.value.genero;
      this.cliente_aux.email = this.forma.value.email;
      this.cliente_aux.telefono = this.forma.value.telefono;
      
      console.log(this.cliente_aux);

      this._clientesService.addCliente(this.cliente_aux);
      this.dataSource = new MatTableDataSource(this.clientes);

      // reset
      this.forma.reset({ // valor completo
        nombre: '',
        fecha_nac: '',
        genero: '1',
        email: '',
        telefono: ''
      });

    } else {
      // para que toque todos los campos y salga error
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }


  }


}
