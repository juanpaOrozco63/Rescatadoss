import { Component, OnInit } from '@angular/core';
import { ReportarPerdidosService } from 'src/app/services/reportar-perdidos.service';
import { ReportarPerdidosGatosService } from 'src/app/services/reportar-perdidos-gatos.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReportarEncontradosService } from 'src/app/services/reportar-encontrados.service';
import { ReportarEncontradosGatosService } from 'src/app/services/reportar-encontrados-gatos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perrosPerdidos:any[]=[];
  perrosEncontrados:any[]=[];
  gatosEncontrados:any[]=[];
  gatosPerdidos:any[]=[];
  keysPerrosPerdidos:any[]=[]
  keysGatosPerdidos:any[]=[]
  keysPerrosEncontrados:any[]=[]
  keysGatosEncontrados:any[]=[]
  correo:String='';
  cargando = false

  constructor(private perrosPerdidosService:ReportarPerdidosService, private gatosPerdidosService:ReportarPerdidosGatosService, private auth:AngularFireAuth,
    private perrosEncontradosService:ReportarEncontradosService,private gatosEncontradosService:ReportarEncontradosGatosService
      ,private router:Router) { 

  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user)=>{
      // console.log(user);
      if(user){
        this.correo=user.email
      }else{
        // console.log('No Esta logueado');
      }
    
    })
      this.perrosPerdidosService.getPerrosPerdidosList().get().subscribe(resp=>{
        resp.docs.forEach(data=>{
          const valuePerros =data.data();
          let correoComparacion= valuePerros.correoContacto;
          // console.log(correoComparacion);
          // console.log(this.correo);
          if(this.correo==correoComparacion){
            this.perrosPerdidos.push(data.data())
            // console.log(data.id);
          }

        })
      })
      this.gatosPerdidosService.getGatosPerdidosList().get().subscribe(resp=>{
        resp.docs.forEach(data=>{
          const valueGatos= data.data();
          let correoComparacion2 = valueGatos.correoContacto;
          if(this.correo==correoComparacion2){
            this.gatosPerdidos.push(data.data())
          }
        })
      })
      this.perrosEncontradosService.getPerrosEncontradosList().get().subscribe(resp=>{
        resp.docs.forEach(data=>{
          const valuePerrosEncontrados =data.data();
          let correoComparacion3= valuePerrosEncontrados.correoContacto;
          if(this.correo==correoComparacion3){
            this.perrosEncontrados.push(data.data());
          }
        })
      })
      this.gatosEncontradosService.getGatosEncontradosList().get().subscribe(resp=>{
        resp.docs.forEach(data=>{
          const valueGatosEncontrados =data.data();
          let correoComparacion4 =valueGatosEncontrados.correoContacto;
          if(this.correo==correoComparacion4){
            this.gatosEncontrados.push(data.data());
          }
        })
      })
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
      
  }
  eliminarPerroPerdido(){
    this.perrosPerdidosService.getPerrosPerdidosList().get().subscribe(resp=>{
      resp.docs.forEach(data=>{
        const valuePerros =data.data();
        let correoComparacion= valuePerros.correoContacto;
        // console.log(correoComparacion);
        // console.log(this.correo);
        if(this.correo==correoComparacion){
          this.keysPerrosPerdidos.push(data.id);
          Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Esta publicacion fue eliminada satisfactoriamente.',
                'success'
              )
              this.perrosPerdidosService.deletePerrosPerdidos(data.id);
              this.router.navigate(['/home']);
             
            }
          })
        }

      })
    })

  }
  eliminarGatoPerdido(){
    this.gatosPerdidosService.getGatosPerdidosList().get().subscribe(resp=>{
      resp.docs.forEach(data=>{
        const valueGatos= data.data();
        let correoComparacion2 = valueGatos.correoContacto;
        if(this.correo==correoComparacion2){
          this.keysGatosPerdidos.push(data.id);
          Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Esta publicacion fue eliminada satisfactoriamente.',
                'success'
              )
              this.gatosPerdidosService.deleteGatosPerdidos(data.id);
              this.router.navigate(['/home']);

            }
          })
         

        }
      })
    })

  }
  eliminarPerrosEncontrados(){
    this.perrosEncontradosService.getPerrosEncontradosList().get().subscribe(resp=>{
      resp.docs.forEach(data=>{
        const valuePerrosEncontrados =data.data();
        let correoComparacion3= valuePerrosEncontrados.correoContacto;
        if(this.correo==correoComparacion3){
          this.keysPerrosEncontrados.push(data.id);
          Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Esta publicacion fue eliminada satisfactoriamente.',
                'success'
              )
              this.perrosEncontradosService.deletePerrosEncontrados(data.id);
              this.router.navigate(['/home']);

            }
          })
        }
      })
    })
  }
  eliminarGatosEncontrados(){
    this.gatosEncontradosService.getGatosEncontradosList().get().subscribe(resp=>{
      resp.docs.forEach(data=>{
        const valueGatosEncontrados =data.data();
        let correoComparacion4 =valueGatosEncontrados.correoContacto;
        if(this.correo==correoComparacion4){
          this.keysGatosEncontrados.push(data.id);
          Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Esta publicacion fue eliminada satisfactoriamente.',
                'success'
              )
              this.gatosEncontradosService.deleteGatosEncontrado(data.id);
              this.router.navigate(['/home']);

            }
          })

        }
      })
    })
  }


}
