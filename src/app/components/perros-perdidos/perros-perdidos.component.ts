import { Component, OnInit } from '@angular/core';
import { ReportarPerdidosService } from 'src/app/services/reportar-perdidos.service';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perros-perdidos',
  templateUrl: './perros-perdidos.component.html',
  styleUrls: ['./perros-perdidos.component.css']
})
export class PerrosPerdidosComponent implements OnInit {
  perro:any
  perros: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  constructor(private perdido:ReportarPerdidosService,private db:AngularFirestore,private router:Router) { }
  
  ngOnInit() {
    this.perdido.getPerrosPerdidosList().get().subscribe(resp=>{
      // console.log(resp);
      resp.docs.forEach(document=>{
        this.perro = document.data();
        this.perros.push(this.perro)
      })
      // console.log(this.perros);
     
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
    })  
  }
  buscarPerro(){
    this.buscar = this.buscar
    let perrosLeer:any[]=[];
    for(let prroPerdido of this.perros){
      let nombrePerro = prroPerdido.nombre;
      if(nombrePerro.indexOf(this.buscar)>=0){
        perrosLeer.push(prroPerdido)
      }
    }
    if(this.buscar.length>0){
      this.router.navigate(['/perroPerdido',this.buscar]);
      // console.log(perrosLeer);
    }
    else{
        this.validar =true
    }
  // return perrosLeer
    }
    
    buscarPerro2(nombre:String){
      let perrosLeer:any[]=[];
      for(let prroPerdido of this.perros){
        let nombrePerro = prroPerdido.nombre;
          perrosLeer.push(prroPerdido)
      }

        this.router.navigate(['/perroPerdido',nombre]);
        // console.log(perrosLeer);
      
    }

}
