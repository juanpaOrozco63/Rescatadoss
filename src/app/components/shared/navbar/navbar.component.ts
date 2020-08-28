import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  valoracion:boolean=false
  valoracionNavbarAdmin:boolean=false
  valoracionNavbarNormal:boolean=false
  constructor(public auth: AngularFireAuth, private route:Router) { 
  }

  ngOnInit() {
    this.auth.onAuthStateChanged(resp=>{
      if(resp){
        this.valoracion=true
      }
      else{
        this.valoracion=false
        // console.log('Usuario salio');
      }
    })
    if(localStorage.getItem("tipoUsuario")=='admin'){
      // console.log("entro admin");
      this.valoracionNavbarAdmin=true
    }
    if (localStorage.getItem("tipoUsuario")=='normal') {
      this.valoracionNavbarNormal=true
      // console.log("entro normal");
    } 
  }
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.route.navigate(['/login'])
    setTimeout(() => {
      
      window.location.reload();
    }, 500);  
  }


}
