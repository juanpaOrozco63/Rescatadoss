import { Component, OnInit } from '@angular/core';
import { FormulariosLlenosService } from 'src/app/services/formularios-llenos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {
  cargando=false
  formulario:any
  formularios:any[]=new Array<any>();
  
  constructor(private formulariosAdopcion:FormulariosLlenosService,private route:Router) { }

  ngOnInit() {
    
    this.formulariosAdopcion.getFormularioAdopcionList().get().subscribe(resp=>{

      resp.docs.forEach(document=>{
        this.formulario = document.data();
        this.formularios.push(this.formulario)
  
      })
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
     })
  }
  eliminar(){
    this.formulariosAdopcion.getFormularioAdopcionList().get().subscribe(resp=>{
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
           this.formulariosAdopcion.deleteFormularioAdopcion(data.id);
           this.route.navigate(['/home']);
          
         }
       })
      })
    })
    
  }

}
