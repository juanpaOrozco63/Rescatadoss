import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarAdoptadoService } from 'src/app/services/reportar-adoptado.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportarAdopcionService } from 'src/app/services/reportar-adopcion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.css']
})
export class AdopcionComponent implements OnInit {
  nombre:any
  noEncontrado:boolean=false
  mascotaAdo: any[]=[]
  cargando = false
  valoracionNavbarAdmin:boolean
  valoracionNavbarNormal:boolean
  constructor(private _activadedRoute:ActivatedRoute,private encontrado:ReportarAdopcionService,private db:AngularFirestore,private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem("tipoUsuario")=='admin'){
      // console.log("entro admin");
      this.valoracionNavbarAdmin=true
    }
    if (localStorage.getItem("tipoUsuario")=='normal') {
      this.valoracionNavbarNormal=true
      // console.log("entro normal");
    } 
    this._activadedRoute.params.subscribe(resp=>{
      this.nombre=resp
      this.encontrado.getmascotasadopcionsList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        // console.log(value);
        let nombreEncontrado = value.nombre;
        if(this.nombre.sexo==nombreEncontrado){
          this.mascotaAdo.push(document.data());
        }    
      
        })
      })
      
    })
    setTimeout(() => {
      this.cargando=true
    }, 500);
    
  }
  regresarEncontrado(){
    this.route.navigate(['/adopciones'])
   }
   formulario(){
     this.route.navigate(['/llenarFormulario'])
   }
   eliminar(){
     this.encontrado.getmascotasadopcionsList().get().subscribe(resp=>{
       resp.docs.forEach(data=>{
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
            this.encontrado.deleteMascotaAdopcion(data.id);
            this.route.navigate(['/home']);
           
          }
        })
       })
     })
     
   }
   
   
}
