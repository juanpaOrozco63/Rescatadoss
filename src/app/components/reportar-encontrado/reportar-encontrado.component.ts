import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { reportarEncontradoModel } from 'src/app/models/reportarEncontrado';
import Swal from 'sweetalert2';
import { ReportarEncontradosService } from 'src/app/services/reportar-encontrados.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReportarEncontradosGatosService } from 'src/app/services/reportar-encontrados-gatos.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-reportar-encontrado',
  templateUrl: './reportar-encontrado.component.html',
  styleUrls: ['./reportar-encontrado.component.css']
})
export class ReportarEncontradoComponent implements OnInit {
  reportarEncontrado = new reportarEncontradoModel();
  formulario: FormGroup;
  correo:string=''
  cargando=false
  comunas:any[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  porcentajeSubida:number=0;
  constructor(private fb: FormBuilder,private reportarServicePerros:ReportarEncontradosService,private storage:AngularFireStorage,
     private reportarServiceGatos:ReportarEncontradosGatosService,public auth: AngularFireAuth) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.auth.onAuthStateChanged((user)=>{
      // console.log(user);
      if(user){
        this.correo=user.email
        this.reportarEncontrado.correoContacto=this.correo;
      }else{
        // console.log('No Esta logueado');
      }
    })
  }
  get razaNoValido() {
    return this.formulario.get('raza').invalid && this.formulario.get('raza').touched
  }
  get colorDominanteNoValido() {
    return this.formulario.get('colorDominante').invalid && this.formulario.get('colorDominante').touched

  }
  get colorSecundarioNoValido() {
    return this.formulario.get('colorSecundario').invalid && this.formulario.get('colorSecundario').touched

  }
  get nombreContactoNoValido() {
    return this.formulario.get('nombreContacto').invalid && this.formulario.get('nombreContacto').touched

  }
  get numeroContactoNoValido() {
    return this.formulario.get('numeroContacto').invalid && this.formulario.get('numeroContacto').touched

  }
  get correoNoValido() {
    return this.formulario.get('correoContacto').invalid && this.formulario.get('correoContacto').touched

  }
  get comunaNoValido() {
    return this.formulario.get('comuna').invalid && this.formulario.get('comuna').touched
  }
  get barrioNoValido() {
    return this.formulario.get('barrio').invalid && this.formulario.get('barrio').touched
  }
  get tamanoNoValido(){
    return this.formulario.get('tamano').invalid && this.formulario.get('tamano').touched

  }
  get fechaVistoNovalido(){
    return this.formulario.get('fechaVisto').invalid && this.formulario.get('fechaVisto').touched
  }
  get imagenNoValido(){
    return this.formulario.get('imgUrl').invalid && this.formulario.get('imgUrl').touched

  }
  get mascotaNoValido(){
    return this.formulario.get('mascota').invalid && this.formulario.get('mascota').touched

  }
  ngOnInit() {
    setTimeout(() => {
      this.cargando=true
    }, 500);
  }
  crearFormulario() {
    this.formulario = this.fb.group({
      //Info Mascotas
      mascota: ['', [Validators.required]],
      raza: ['', [Validators.required, Validators.minLength(3)]],
      fechaVisto: ['', [Validators.required]],
      comuna: ['', [Validators.required, Validators.max(22)]],
      barrio: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['', [Validators.required]],
      colorDominante: ['', [Validators.required, Validators.minLength(3)]],
      colorSecundario: ['', []],
      tamano: ['', [Validators.required]],
      pelaje: ['', [Validators.required]],
      descripcion: ['', []],
      //Info Contacto
      nombreContacto: ['', [Validators.required, Validators.minLength(3)]],
      numeroContacto: ['', [Validators.required, Validators.max(9999999999)]],
      numeroAlterno: ['', []],
      correoContacto: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9,-]+\.[a-z]{2,3}$'),Validators.email]],
      imgUrl:['',[Validators.required]],
      dirre:['']


    })

  }
  //Cargar Datos Formulario
  cargarDataFormulario() {
    this.formulario.reset({
      mascota:'Perro',
      raza:'',
      fechaVisto:'', 
      comuna:''  ,
      barrio:'',
      sexo:'Macho',
      colorDominante:'',
      colorSecundario:'',
      tamano:'Pequeño',
      pelaje:'Corto',
      descripcion:'',
      nombreContacto:'',
      numeroContacto:'',
      numeroAlterno:'',
      correoContacto:'',
      imgUrl:'',
      dirre:''
    });
    }
    guardar() {
      if (this.formulario.invalid) {
        // console.log(this.formulario);
        Swal.fire({
        allowOutsideClick:false,
        icon: 'error',
        text:'Falta informacion'
        })
        // console.log(this.formulario.value.mascota);
        return Object.values(this.formulario.controls).forEach(control => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(control => control.markAsTouched());
          } else {
            control.markAsTouched();
          }
        });
      }else{
        if(this.formulario.value.mascota=='Perro'){
          this.reportarServicePerros.createPerrosEncontrados(this.reportarEncontrado)
          
        }else{
          this.reportarServiceGatos.createGatosEncontrados(this.reportarEncontrado)
          
        }
  
        // console.log(this.reportarEncontrado);
        setTimeout(() => {
          Swal.fire({
              allowOutsideClick:false,
              title:'Reporte Completado',
              icon: 'success',
              text:'Informacion Guardada'
              })
          
          
        }, 1500);
        Swal.fire({
          title:'Espere',
          text:'Guardando informacion',
          allowOutsideClick: false,
          icon: 'info'
        });
        Swal.showLoading();
        this.formulario.reset();
        this.porcentajeSubida=0
      }
    }
    agregarImagen(evento){
      let archivo = evento.target.files[0];
      // console.log(archivo.name);
      let ruta = `fotosPerrosPerdidos/${archivo.name}`;
      // console.log(ruta);
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
     tarea.percentageChanges().subscribe(porcentaje=>{
       this.porcentajeSubida= parseInt(porcentaje.toString())
     })
     tarea.then(resp=>{
       referencia.getDownloadURL().subscribe(url=>{
         this.reportarEncontrado.imgUrl=url;       
  
     })
     })
    }
}
