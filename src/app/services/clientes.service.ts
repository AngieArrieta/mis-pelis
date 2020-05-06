import { Injectable } from '@angular/core';
import { Cliente } from '../Models/Cliente.model';

@Injectable()

export class ClientesService {

private clientes: Cliente [] = [];
private clientesDummies: Cliente [] = [
    {
        id: 1,
        nombre:'Angie Arrieta',
        edad: 16,
        genero: '1',
        email:'angie@correo.com',
        telefono:'3000000000'
    },
    {
        id: 2,
        nombre:'Marbel Arrieta',
        edad: 29,
        genero: '1',
        email:'marbel@correo.com',
        telefono:'3111111111'
    },
    {
        id: 3,
        nombre:'cristian galvan',
        edad: 20,
        genero: '2',
        email:'cristian@correo.com',
        telefono:'3222222222'
    },
    {
        id: 4,
        nombre:'johan samper',
        edad: 19,
        genero: '2',
        email:'johan@correo.com',
        telefono:'33333333333'
    },
    {
        id: 5,
        nombre:'manuel candela',
        edad: 20,
        genero: '2',
        email:'juan@correo.com',
        telefono:'3444444444'
    },
    {
        id: 6,
        nombre:'milagro gutierrez',
        edad: 20,
        genero: '1',
        email:'milagro@correo.com',
        telefono:'35555555555-'
    }
];

 constructor(){
     console.log('servicio listo');

  }

 addCliente(cliente_nuevo : Cliente){
    this.clientes.push(cliente_nuevo);
    console.log('desde el servico ::::::::::');
    console.log(this.clientes)
 }

 getClientes() {
     return this.clientesDummies;
 }

 getClientesDinamicos() {
    return this.clientes;

}

 searchClienteById(id: string) : Cliente {

    let client: Cliente = null;

    for (const i of this.clientesDummies) {
        if( i.id == Number(id)){
            client = i;
        }
    }
    console.log('cliente desde funcion: ' + client)
    return client;
 }

}


