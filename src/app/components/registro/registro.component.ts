import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'firebase';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioRegistro:FormGroup;
  usuario: User;
  registro = new UsuarioModel();
  cargando: boolean=true;
  constructor(private fb:FormBuilder,public auth: AngularFireAuth,private usuarioService:UsuariosService,private router:Router) { 
    this.crearFormulario();
    this.cargarDataFormulario();
    this.auth.user.subscribe(resp=>{
      setTimeout(() => {
        this.usuario=resp;
        this.cargando=false  
      }, 500);

    })
  }
  get correoNoValido() {
    return this.formularioRegistro.get('correo').invalid && this.formularioRegistro.get('correo').touched

  }
  get passwordNoValido() {
    return this.formularioRegistro.get('password').invalid && this.formularioRegistro.get('password').touched

  }
  crearFormulario(){
    this.formularioRegistro=this.fb.group({
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9,-]+\.[a-z]{2,3}$'),Validators.email]],
      password:['',[Validators.required]],
      tipoUsuario:[''],
      passwordRepetir:['',[Validators.required]]
    })
  }
  cargarDataFormulario(){
    this.formularioRegistro.reset({
      correo:'',
      password:'',
      tipoUsuario:0,
      passwordRepetir:''
    });

  }
  ngOnInit() {
  }
  registrar(){
    if(this.registro.password==this.registro.passwordRepetir){
      this.auth.createUserWithEmailAndPassword(this.registro.correo,this.registro.password).then(resp=>{
      this.usuarioService.getUsuariosList().get().subscribe(resp=>{
        resp.forEach(data=>{
          if(data.data().correo==this.registro.correo){
              localStorage.setItem("tipoUsuario","normal");
              this.router.navigate(['/home']);
            }
           
        })
      })
      Swal.fire({
        allowOutsideClick:false,
        icon: 'info',
        text:'Cargando'
        })
        setTimeout(() => {
          Swal.fire({
            allowOutsideClick:false,
            icon: 'success',
            text:'Bienvenido a rescatadoss'
          })
          
        }, 1000)
        this.router.navigate(['/home'])
        this.usuarioService.createUsuarios(this.registro);
          
    }).catch(function(error){
      var errorCode = error.code;
      if(errorCode=='auth/weak-password'){
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          text:'Contraseña debil'
        })
        
      }
      else if(errorCode=='auth/email-already-in-use'){
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          text:'Este correo ya existe'
        })
        
      }
    });
  }  else{
    Swal.fire({
      allowOutsideClick:false,
      icon: 'error',
      text:'Las contraseñas no coinciden'
    })
  }
   
      
     


}
}
