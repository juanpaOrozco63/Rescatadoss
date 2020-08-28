import { Component, OnInit } from '@angular/core';
import { ReportarAdopcionService } from 'src/app/services/reportar-adopcion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.css']
})
export class AdopcionesComponent implements OnInit {

  perros: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  comenzarBtn=false
  constructor(private encontrado:ReportarAdopcionService,private db:AngularFirestore,private router:Router,
    public auth: AngularFireAuth) { 
    
  }
  ngOnInit() {
    this.auth.onAuthStateChanged(resp=>{
      if(resp){
        this.comenzarBtn=true
        // console.log('logueado');
      }
      else{
        // console.log('no logueado');
        // console.log('Usuario salio');
      }
    })
    this.db.collection('mascotasAdopcion').valueChanges().subscribe(resp=>{
      // console.log(resp);
      this.perros = resp;
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
    })
    
  }

  
  // return perrosLeer
    
    
    buscarPerro2(nombre:String){
      let perrosLeer:any[]=[];
      for(let prroEncontrado of this.perros){
        // console.log(prroEncontrado);
        let nombrePerro = prroEncontrado.nombre;
        // console.log(nombrePerro);
          perrosLeer.push(prroEncontrado)
          // console.log(perrosLeer);
      }

        this.router.navigate(['/adopciones',nombre]);
        // console.log('entro');
      
    }
    comenzar(){
      window.location.reload()
    }

}
