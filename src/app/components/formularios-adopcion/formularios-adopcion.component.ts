import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { formularioAdopcionModel } from 'src/app/models/formularioAdopcion.model';
import { FormulariosAdopcionService } from 'src/app/services/formularios-adopcion.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormulariosLlenosService } from 'src/app/services/formularios-llenos.service';
@Component({
  selector: 'app-formularios-adopcion',
  templateUrl: './formularios-adopcion.component.html',
  styleUrls: ['./formularios-adopcion.component.css']
})
export class FormulariosAdopcionComponent implements OnInit {
  cargando=false
  porcentajeSubida:number=0;
  formularios = new formularioAdopcionModel();
  formulario: FormGroup;
  form:any
  constructor(private storage:AngularFireStorage, private formularioAdopcionService:FormulariosAdopcionService,private fb: FormBuilder,private formularioLlenoService:FormulariosLlenosService) { 
    this.crearFormulario();
    this.cargarDataFormulario();
  }

  ngOnInit() {
    this.formularioAdopcionService.getFormularioAdopcionList().get().subscribe(resp=>{
      resp.docs.forEach(document=>{
        this.form = document.data();
      })
    })
    setTimeout(() => {
      this.cargando=true
    }, 500);
  }
  agregarDocumento(evento){
    let archivo = evento.target.files[0];
    this.formularios.nombre= archivo.name
    let ruta = `formulariosAdopcion/${archivo.name}`;
    // console.log(ruta);
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
   tarea.percentageChanges().subscribe(porcentaje=>{
     this.porcentajeSubida= parseInt(porcentaje.toString())
   })
   tarea.then(resp=>{
     referencia.getDownloadURL().subscribe(url=>{
       this.formularios.url=url;       

   })
   })
  }
  crearFormulario() {
    this.formulario = this.fb.group({
      url: ['']


    })

  }
  cargarDataFormulario() {
    this.formulario.setValue({
      url:''
   
    });
    }
  enviar(){
    if (this.porcentajeSubida==0) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Adjunte su formulario'
      })
    }else{
 
    setTimeout(() => {
      Swal.fire({
          allowOutsideClick:false,
          title:'Formulario Enviado',
          icon: 'success',
          text:'Formulario Guardado'
          })
      
      
    }, 1500);
    Swal.fire({
      title:'Espere',
      text:'Guardando Formulario',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();  
      this.formularioLlenoService.createFormularioAdopcion(this.formularios)
      this.porcentajeSubida=0
    
  }
}
  
}
