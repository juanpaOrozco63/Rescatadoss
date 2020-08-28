import { Component, OnInit } from '@angular/core';
import { ReportarEncontradosService } from 'src/app/services/reportar-encontrados.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perros-encontrados',
  templateUrl: './perros-encontrados.component.html',
  styleUrls: ['./perros-encontrados.component.css']
})
export class PerrosEncontradosComponent implements OnInit {
  perros: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  perro:any
  constructor(private encontrado:ReportarEncontradosService,private db:AngularFirestore,private router:Router) { }
  ngOnInit() {
    this.encontrado.getPerrosEncontradosList().get().subscribe(resp=>{
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
    for(let prroEncontrado of this.perros){
      let colorDominantePerro = prroEncontrado.colorDominante;
      if(colorDominantePerro.indexOf(this.buscar)>=0){
        perrosLeer.push(prroEncontrado)
      }
    }
    if(this.buscar.length>0){
      this.router.navigate(['/perroEncontrado',this.buscar]);
      // console.log(perrosLeer);
    }
    else{
        this.validar =true
    }
  // return perrosLeer
    }
    
    buscarPerro2(colorDominante:String){
      let perrosLeer:any[]=[];
      for(let prroEncontrado of this.perros){
        // console.log(prroEncontrado);
        let colorDominantePerro = prroEncontrado.colorDominante;
        // console.log(colorDominantePerro);
          perrosLeer.push(prroEncontrado)
      }

        this.router.navigate(['/perroEncontrado',colorDominante]);
        // console.log(perrosLeer);
      
    }

}
