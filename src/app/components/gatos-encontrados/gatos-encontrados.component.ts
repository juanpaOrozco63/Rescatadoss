import { Component, OnInit } from '@angular/core';
import { ReportarEncontradosGatosService } from 'src/app/services/reportar-encontrados-gatos.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gatos-encontrados',
  templateUrl: './gatos-encontrados.component.html',
  styleUrls: ['./gatos-encontrados.component.css']
})
export class GatosEncontradosComponent implements OnInit {
  gatos: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  gato:any
  constructor(private encontrado:ReportarEncontradosGatosService
    ,private db:AngularFirestore,private router:Router) { 
    
  }

  ngOnInit() {
    this.encontrado.getGatosEncontradosList().get().subscribe(resp=>{
      // console.log(resp);
      resp.docs.forEach(document=>{
        this.gato = document.data();
        this.gatos.push(this.gato)
      })
      // console.log(this.perros);
     
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
    })  
  }
  buscarGato(){
    this.buscar = this.buscar
    let gatosLeer:any[]=[];
    for(let gatoEncontrado of this.gatos){
      let colorDominanteGato = gatoEncontrado.colorDominante;
      if(colorDominanteGato.indexOf(this.buscar)>=0){
        gatosLeer.push(gatoEncontrado)
      }
    }
    if(this.buscar.length>0){
      this.router.navigate(['/gatoEncontrado',this.buscar]);
    }
    else{
        this.validar =true
    }
    }
    buscarGato2(colorDominante:String){
      let perrosLeer:any[]=[];
      for(let gatoEncontrado of this.gatos){
        let colorDominanteGato = gatoEncontrado.colorDominante;
          perrosLeer.push(gatoEncontrado)
      }

        this.router.navigate(['/gatoEncontrado',colorDominante]);
      
    }

}

