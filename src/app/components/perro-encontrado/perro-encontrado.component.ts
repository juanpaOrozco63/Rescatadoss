import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarEncontradosService } from 'src/app/services/reportar-encontrados.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-perro-encontrado',
  templateUrl: './perro-encontrado.component.html',
  styleUrls: ['./perro-encontrado.component.css']
})
export class PerroEncontradoComponent implements OnInit {
  perros: any[]=new Array<any>();
  colorDominante:any
  noEncontrado:boolean=false
  perroBuscado: any[]=[]
  cargando = false
  constructor(private _activadedRoute:ActivatedRoute,private encontrado:ReportarEncontradosService,private db:AngularFirestore,private route:Router) { }
  ngOnInit() {
    this._activadedRoute.params.subscribe(resp=>{
      // console.log(resp);
      this.colorDominante=resp
      this.encontrado.getPerrosEncontradosList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        let colorDominanteComparacion = value.colorDominante.toLowerCase();
        if(this.colorDominante.colorDominante.toLowerCase()==colorDominanteComparacion){
          this.perroBuscado.push(document.data());
          
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
    this.route.navigate(['/perrosEncontrados'])
   }
   

}
