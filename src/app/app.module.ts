import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ---- angular material ---
import { MaterialModule } from './app.material.module';

// componentes
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // material
import { ClientesComponent } from './components/clientes/clientes.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { VenderComponent } from './components/vender/vender.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BotoneraComponent } from './components/shared/botonera/botonera.component';
import {InicioComponent} from './components/inicio/inicio.component';

// pipes
import { GeneroPipe } from './pipes/genero.pipe';

// rutas
import {appRouting} from './app.routes';


// modulos
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';



// servicios
import { ClientesService } from './services/clientes.service';
import { ValidadoresService } from './services/validadores.service';
import { CategoriaService } from './services/categorias.service';
import { PeliculasService } from './services/peliculas.service';
import { ventasService } from './services/ventas.service';











@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ClientesComponent,
    PeliculasComponent,
    VenderComponent,
    ReportesComponent,
    NavbarComponent,
    BotoneraComponent,
    GeneroPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    ChartsModule,
    appRouting
  ],
  providers: [ClientesService, ValidadoresService, CategoriaService, PeliculasService, ventasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
