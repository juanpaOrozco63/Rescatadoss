import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarAdoptadoService } from 'src/app/services/reportar-adoptado.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adoptado',
  templateUrl: './adoptado.component.html',
  styleUrls: ['./adoptado.component.css']
})
export class AdoptadoComponent implements OnInit {
  nombre:any
  noEncontrado:boolean=false
  mascotaAdo: any[]=[]
  cargando = false
  valoracionNavbarAdmin:boolean
  valoracionNavbarNormal:boolean
  constructor(private _activadedRoute:ActivatedRoute,private encontrado:ReportarAdoptadoService,private db:AngularFirestore,private route:Router) { }

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
      this.encontrado.getmascotaAdoptadasList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        // console.log(value);
        let nombreComparacion = value.nombre;
        if(this.nombre.sexo==nombreComparacion){
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
    this.route.navigate(['/adoptados'])
   }
   eliminar(){
    this.encontrado.getmascotaAdoptadasList().get().subscribe(resp=>{
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
           this.encontrado.deleteMascotaAdoptada(data.id);
           this.route.navigate(['/home']);
          
         }
       })
      })
    })
    
  }
   

}
  