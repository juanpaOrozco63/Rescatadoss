import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportarPerdidosGatosService } from 'src/app/services/reportar-perdidos-gatos.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-gato-perdido',
  templateUrl: './gato-perdido.component.html',
  styleUrls: ['./gato-perdido.component.css']
})
export class GatoPerdidoComponent implements OnInit {
  gatos: any[]=new Array<any>();
  nombre:any
  noEncontrado:boolean=false
  gatoBuscado: any[]=[]
  cargando = false
  constructor(private _activadedRoute:ActivatedRoute,private perdido:ReportarPerdidosGatosService,private db:AngularFirestore,private route:Router) { }

  ngOnInit() {
    this._activadedRoute.params.subscribe(resp=>{
      // console.log(resp);
      this.nombre=resp
      this.perdido.getGatosPerdidosList().get().subscribe(resp=>{
        resp.docs.forEach(document=>{
        let value = document.data();
        let nombreComparacion = value.nombre.toLowerCase();
        if(this.nombre.nombre.toLowerCase()==nombreComparacion){
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
  regresar(){
    this.route.navigate(['/gatosPerdidos'])
   }

}
