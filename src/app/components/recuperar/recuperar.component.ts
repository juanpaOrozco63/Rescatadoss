import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  correo:string=''
  usuario:User
  correoValido:boolean=false
  cargando:boolean= true
  constructor(public auth: AngularFireAuth,private route:Router) {
  this.auth.user.subscribe(resp=>{
    setTimeout(() => {
      
      this.cargando=false
      this.usuario=resp
    }, 500);
  })
     }
  ngOnInit() {
  }
  get correoNoValido(){
    return this.correoValido
  }
  recuperarContra(){
    // console.log(this.correo);
    this.auth.sendPasswordResetEmail(this.correo).then(function() {
    // Email sent.
    Swal.fire({
      allowOutsideClick:false,
      icon: 'success',
      text:'Correo Enviado'
      })
    // console.log('Correo Enviado');
    }).catch(function(error) {
      
      Swal.fire({
        allowOutsideClick:false,
        icon: 'error',
        text:'Verifique el correo'
        })
    // An error happened.
    });
    this.correoValido=true
  }
  regresar(){
    this.route.navigate(['/login'])
   }
}
