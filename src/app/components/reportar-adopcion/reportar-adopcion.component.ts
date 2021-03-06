import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { reportarAdopcionModel } from 'src/app/models/reportarAdopcion.model';
import Swal from 'sweetalert2';
import { ReportarAdopcionService } from 'src/app/services/reportar-adopcion.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportar-adopcion',
  templateUrl: './reportar-adopcion.component.html',
  styleUrls: ['./reportar-adopcion.component.css']
})
export class ReportarAdopcionComponent implements OnInit {
  reportarAdopcion = new reportarAdopcionModel();
  formulario: FormGroup;
  porcentajeSubida: number = 0;
  usuario: User
  correo: string = ''
  tipoUsuario:string=''
  cargando=false
  constructor(private fb: FormBuilder, private reportarAdopcionService: ReportarAdopcionService, private storage: AngularFireStorage,
    public auth: AngularFireAuth,private usuariosService:UsuariosService,private router:Router) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.correo = user.email
        this.tipoUsuario=localStorage.getItem('tipoUsuario')
      } else {
        // console.log('No Esta logueado');
      }
      
    })
  }
  ngOnInit() {
    setTimeout(() => {
      this.cargando=true
    }, 500);
   
  }
  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
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

  get tamanoNoValido() {
    return this.formulario.get('tamano').invalid && this.formulario.get('tamano').touched

  }
  get imagenNoValido() {
    return this.formulario.get('imgUrl').invalid && this.formulario.get('imgUrl').touched

  }
  get mascotaNoValido() {
    return this.formulario.get('mascota').invalid && this.formulario.get('mascota').touched

  }
  get tipoUsuarioNoValido(){
    return this.formulario.get('tipoUsuario').invalid && this.formulario.get('tipoUsuario').touched

}
  //Metodos Formulario
  crearFormulario() {
    this.formulario = this.fb.group({
      //Info Mascotas
      nombre:['',[Validators.required,Validators.minLength(3)]],
      mascota: ['', [Validators.required]],
      raza: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['',],
      sexo: ['', [Validators.required]],
      colorDominante: ['', [Validators.required, Validators.minLength(3)]],
      colorSecundario: ['', []],
      tamano: ['', [Validators.required]],
      pelaje: ['', [Validators.required]],
      esterilizacion: ['', [Validators.required]],
      descripcion: ['', []],
      imgUrl: ['', [Validators.required]],
      tipoUsuario:['',[Validators.required]],
      meses:['']

    })

  }
  //Cargar Datos Formulario
  cargarDataFormulario() {
    this.formulario.setValue({
      nombre:'',
      mascota: 'Perro',
      raza: '',
      edad: '',
      sexo: 'Macho',
      colorDominante: '',
      colorSecundario: '',
      tamano: 'Pequeño',
      pelaje: 'Corto',
      esterilizacion: 'Si',
      descripcion: '',
      imgUrl: '',
      tipoUsuario:'',
      meses:''
    });
  }
  guardar() {
    // console.log(this.formulario);
    if (this.formulario.invalid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Falta informacion'
      })
      // console.log(this.formulario.value.mascota);
      return Object.values(this.formulario.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.reportarAdopcionService.createmascotasadopcions(this.reportarAdopcion)
      // console.log(this.reportarAdopcion);
      setTimeout(() => {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Reporte Completado',
          icon: 'success',
          text: 'Informacion Guardada'
        })


      }, 1500);
      Swal.fire({
        title: 'Espere',
        text: 'Guardando informacion',
        allowOutsideClick: false,
        icon: 'info'
      });
      Swal.showLoading();
      this.formulario.reset();
      this.porcentajeSubida = 0
    }
    
  }
  agregarImagen(evento) {
    let archivo = evento.target.files[0];
    // console.log(archivo.name);
    let ruta = `fotosPerrosPerdidos/${archivo.name}`;
    // console.log(ruta);
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    tarea.percentageChanges().subscribe(porcentaje => {
      this.porcentajeSubida = parseInt(porcentaje.toString())
    })
    tarea.then(resp => {
      referencia.getDownloadURL().subscribe(url => {
        this.reportarAdopcion.imgUrl = url;

      })  
    })
  }

}
