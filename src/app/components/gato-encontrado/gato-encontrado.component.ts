import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarEncontradosGatosService } from 'src/app/services/reportar-encontrados-gatos.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-gato-encontrado',
  templateUrl: './gato-encontrado.component.html',
  styleUrls: ['./gato-encontrado.component.css']
})
export class GatoEncontradoComponent implements OnInit {
  gatos: any[]=new Array<any>();
  colorDominante:any
  noEncontrado:boolean=false
  gatoBuscado: any[]=[]  
  cargando = false
  constructor(private _activadedRoute:ActivatedRoute,private encontrado:ReportarEncontradosGatosService,private db:AngularFirestore,private route:Router) { }
  ngOnInit() {
    this._activadedRoute.params.subscribe(resp=>{
      // console.log(resp);
      this.colorDominante=resp
      this.encontrado.getGatosEncontradosList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        let colorDominanteComparacion = value.colorDominante.toLowerCase();
        if(this.colorDominante.colorDominante.toLowerCase()==colorDominanteComparacion){
          this.gatoBuscado.push(document.data());
          
          // var key = document.id;
        }
          
      
        })
      })
      
    })
    setTimeout(() => {
      this.cargando=true
      
    }, 500);
  }
  regresarEncontrado(){
    this.route.navigate(['/gatosEncontrados'])
   }
   
}
