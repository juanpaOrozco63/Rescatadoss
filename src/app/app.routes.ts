import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerrosEncontradosComponent } from './components/perros-encontrados/perros-encontrados.component';
import { GatosEncontradosComponent } from './components/gatos-encontrados/gatos-encontrados.component';
import { GatosPerdidosComponent } from './components/gatos-perdidos/gatos-perdidos.component';
import { PerrosPerdidosComponent } from './components/perros-perdidos/perros-perdidos.component';
import { ReportarComponent } from './components/reportar/reportar.component';
import { ReportarPerdidoComponent } from './components/reportar-perdido/reportar-perdido.component';
import { ReportarEncontradoComponent } from './components/reportar-encontrado/reportar-encontrado.component';
import { PerroPerdidoComponent } from './components/perro-perdido/perro-perdido.component';
import { LoginComponent } from './components/login/login.component';
import { GatoPerdidoComponent } from './components/gato-perdido/gato-perdido.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AdoptadosComponent } from './components/adoptados/adoptados.component';
import { PerroEncontradoComponent } from './components/perro-encontrado/perro-encontrado.component';
import { ReportarAdminComponent } from './components/reportar-admin/reportar-admin.component';
import { GatoEncontradoComponent } from './components/gato-encontrado/gato-encontrado.component';
import { ReportarAdopcionComponent } from './components/reportar-adopcion/reportar-adopcion.component';
import { ReportarAdoptadoComponent } from './components/reportar-adoptado/reportar-adoptado.component';
import { AdoptadoComponent } from './components/adoptado/adoptado.component';
import { AdopcionComponent } from './components/adopcion/adopcion.component';
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormulariosAdopcionComponent } from './components/formularios-adopcion/formularios-adopcion.component';
import { FormulariosComponent } from './components/formularios/formularios.component';

 export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perrosEncontrados', component: PerrosEncontradosComponent},
    { path: 'perrosPerdidos', component: PerrosPerdidosComponent },
    { path: 'perroPerdido/:nombre', component: PerroPerdidoComponent },
    { path: 'gatoPerdido/:nombre', component:GatoPerdidoComponent },
    { path: 'perroEncontrado/:colorDominante', component: PerroEncontradoComponent },
    { path: 'gatoEncontrado/:colorDominante', component: GatoEncontradoComponent },
    { path: 'gatosEncontrados', component: GatosEncontradosComponent },
    { path: 'gatosPerdidos', component: GatosPerdidosComponent },
    { path: 'adoptados', component: AdoptadosComponent },
    { path: 'adopciones', component: AdopcionesComponent },
    { path: 'reportarAdmin', component: ReportarAdminComponent },
    { path: 'reportar', component: ReportarComponent },
    { path: 'reportar/reportarPerdido', component: ReportarPerdidoComponent },
    { path: 'reportar/reportarEncontrado', component: ReportarEncontradoComponent },
    { path: 'reportarAdmin/reportarAdopcion', component: ReportarAdopcionComponent },
    { path: 'reportarAdmin/reportarAdoptado', component: ReportarAdoptadoComponent },
    { path: 'adoptado/:sexo', component: AdoptadoComponent },
    { path: 'adopciones/:sexo', component: AdopcionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'recuperar', component: RecuperarComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'formularios', component: FormulariosComponent },
    { path: 'llenarFormulario', component: FormulariosAdopcionComponent },
    { path: '', pathMatch:'full', redirectTo: 'home' },
    { path: '**', pathMatch:'full', redirectTo: 'home' }
];