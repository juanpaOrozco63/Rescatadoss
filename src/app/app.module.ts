import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ScrollingModule } from '@angular/cdk/scrolling'

//Rutas
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReportarComponent } from './components/reportar/reportar.component';
import { PerrosEncontradosComponent } from './components/perros-encontrados/perros-encontrados.component';
import { GatosEncontradosComponent } from './components/gatos-encontrados/gatos-encontrados.component';
import { PerrosPerdidosComponent } from './components/perros-perdidos/perros-perdidos.component';
import { GatosPerdidosComponent } from './components/gatos-perdidos/gatos-perdidos.component';
import { ReportarPerdidoComponent } from './components/reportar-perdido/reportar-perdido.component';
import { ReportarEncontradoComponent } from './components/reportar-encontrado/reportar-encontrado.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AdoptadosComponent } from './components/adoptados/adoptados.component';
import { PerroEncontradoComponent } from './components/perro-encontrado/perro-encontrado.component';
import { PerroPerdidoComponent } from './components/perro-perdido/perro-perdido.component';
import { LoginComponent } from './components/login/login.component';
import { GatoPerdidoComponent } from './components/gato-perdido/gato-perdido.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ReportarAdminComponent } from './components/reportar-admin/reportar-admin.component';
import { GatoEncontradoComponent } from './components/gato-encontrado/gato-encontrado.component';
import { ReportarAdopcionComponent } from './components/reportar-adopcion/reportar-adopcion.component';
import { ReportarAdoptadoComponent } from './components/reportar-adoptado/reportar-adoptado.component';
import { AdoptadoComponent } from './components/adoptado/adoptado.component';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { AdopcionComponent } from './components/adopcion/adopcion.component';
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormulariosAdopcionComponent } from './components/formularios-adopcion/formularios-adopcion.component';
import { FormulariosComponent } from './components/formularios/formularios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ReportarComponent,
    PerrosEncontradosComponent,
    GatosEncontradosComponent,
    PerrosPerdidosComponent,
    GatosPerdidosComponent,
    ReportarPerdidoComponent,
    ReportarEncontradoComponent,
    PerroPerdidoComponent,
    LoginComponent,
    GatoPerdidoComponent,
    NosotrosComponent,
    RegistroComponent,
    RecuperarComponent,
    AdoptadosComponent,
    PerroEncontradoComponent,
    ReportarAdminComponent,
    GatoEncontradoComponent,
    ReportarAdopcionComponent,
    ReportarAdoptadoComponent,
    AdoptadoComponent,
    AdopcionComponent,
    AdopcionesComponent,
    PerfilComponent,
    FormulariosAdopcionComponent,
    FormulariosComponent,



  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    ProgressbarModule.forRoot(),
    AngularFireStorageModule,
    ScrollingModule

  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
