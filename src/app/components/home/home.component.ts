import { Component, OnInit } from '@angular/core';
import { ReportarAdopcionService } from 'src/app/services/reportar-adopcion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
      }
      else{
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
    
    
    buscarPerro2(sexo:String){
      let perrosLeer:any[]=[];
      for(let prroEncontrado of this.perros){
        // console.log(prroEncontrado);
        let sexoPerro = prroEncontrado.sexo;
        // console.log(sexoPerro);
          perrosLeer.push(prroEncontrado)
          // console.log(perrosLeer);
      }

        this.router.navigate(['/home',sexo]);
        // console.log('entro');
      
    }
    comenzar(){
      window.location.reload()

    }
    

}
