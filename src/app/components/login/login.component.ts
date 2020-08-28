import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: User;
  cargando: boolean=true;
  formularioLogin:FormGroup;
  olvido:boolean=false;
  ok:string='ok'
  constructor(public auth: AngularFireAuth,private fb:FormBuilder,private usuariosService:UsuariosService,private router:Router
    ) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.auth.user.subscribe(resp=>{
      setTimeout(() => {
        
        this.cargando=false;
        this.usuario=resp;
      }, 500);
   
    })
    
   }
   get correoNoValido() {
    return this.formularioLogin.get('correo').invalid && this.formularioLogin.get('correo').touched

  }
  get passwordNoValido() {
    return this.formularioLogin.get('password').invalid && this.formularioLogin.get('password').touched

  }
  crearFormulario(){
    this.formularioLogin=this.fb.group({
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9,-]+\.[a-z]{2,3}$'),Validators.email]],
      password:['',[Validators.required]]
    })
  }
  cargarDataFormulario(){
    this.formularioLogin.reset({
      correo:'',
      password:''
    });

  }
  ngOnInit() {
 
  }
  login() {
    if (this.formularioLogin.invalid) {
      // console.log(this.formulario);
      Swal.fire({
      allowOutsideClick:false,
      icon: 'error',
      text:'Falta informacion'
      })
      // console.log(this.formulario.value.mascota);
      return Object.values(this.formularioLogin.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }else{ 

      Swal.fire({
        allowOutsideClick:false,
        icon: 'info',
        text:'Cargando'
        })
      setTimeout(() => {       
          this.auth.signInWithEmailAndPassword(this.formularioLogin.value.correo,this.formularioLogin.value.password).then(resp=>{
            this.usuariosService.getUsuariosList().get().subscribe(resp=>{
              resp.forEach(data=>{
                if(data.data().correo==this.formularioLogin.value.correo){
                  if(data.data().tipoUsuario==1){
                    localStorage.setItem("tipoUsuario","admin")
                    this.router.navigate(['/home'])
                  }else{
                    localStorage.setItem("tipoUsuario","normal");
                    this.router.navigate(['/home']);
                  }
                  }
                 
              })
            })
            Swal.fire({
              allowOutsideClick:false,
              icon: 'success',
              text:'Bienvenido'
            }
            )
          }).catch(resp=>{
            Swal.fire({
              allowOutsideClick:false,
              icon: 'error',
              text:'Usuario no registrado'
              })
              this.olvido=true;
          })
      }, 500);
     
  }
  
}

}
