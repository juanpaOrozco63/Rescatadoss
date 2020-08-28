import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarPerdidosService } from 'src/app/services/reportar-perdidos.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-perro-perdido',
  templateUrl: './perro-perdido.component.html',
  styleUrls: ['./perro-perdido.component.css']
})
export class PerroPerdidoComponent implements OnInit {
  perros: any[]=new Array<any>();
  nombre:any
  noEncontrado:boolean=false
  perroBuscado: any[]=[]
  cargando = false
  constructor(private _activadedRoute:ActivatedRoute,private perdido:ReportarPerdidosService,private db:AngularFirestore,private route:Router) { }

  ngOnInit() {
    this._activadedRoute.params.subscribe(resp=>{
      // console.log(resp);
      this.nombre=resp
      this.perdido.getPerrosPerdidosList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        let nombreComparacion = value.nombre.toLowerCase();
        if(this.nombre.nombre.toLowerCase()==nombreComparacion){
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
  regresar(){
   this.route.navigate(['/perrosPerdidos'])
  }
  
}
