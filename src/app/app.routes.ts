import { Routes, RouterModule } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {PeliculasComponent} from './components/peliculas/peliculas.component';
import {ReportesComponent} from './components/reportes/reportes.component';
import {VenderComponent} from './components/vender/vender.component';
import { InicioComponent } from './components/inicio/inicio.component';


export const ROUTES: Routes = [

    { path: 'clientes', component: ClientesComponent },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'vender', component: VenderComponent },
    { path: 'inicio', component: InicioComponent },
    { path: '**', component: InicioComponent },
    { path: '', component: InicioComponent }

];

export const appRouting = RouterModule.forRoot(ROUTES);