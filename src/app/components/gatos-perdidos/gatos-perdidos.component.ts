import { Component, OnInit } from '@angular/core';
import { ReportarPerdidosGatosService } from 'src/app/services/reportar-perdidos-gatos.service';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gatos-perdidos',
  templateUrl: './gatos-perdidos.component.html',
  styleUrls: ['./gatos-perdidos.component.css']
})
export class GatosPerdidosComponent implements OnInit {
  gatos: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  gato:any

  constructor(private perdido:ReportarPerdidosGatosService,private db:AngularFirestore,private router:Router) { }

  ngOnInit() {
   this.perdido.getGatosPerdidosList().get().subscribe(resp=>{

    resp.docs.forEach(document=>{
      this.gato = document.data();
      this.gatos.push(this.gato)

    })
    setTimeout(() => {
      this.cargando=true
      
    }, 500);
   })
     
    }
  
  buscarGato(){
    this.buscar = this.buscar
    let gatosLeer:any[]=[];
    for(let gatoPerdido of this.gatos){
      let nombreGato = gatoPerdido.nombre;
      if(nombreGato.indexOf(this.buscar)>=0){
        gatosLeer.push(gatoPerdido)
      }
    }
    if(this.buscar.length>0){
      this.router.navigate(['/gatoPerdido',this.buscar]);
    }
    else{
        this.validar =true
    }
    }
    buscarGato2(nombre:String){
      let perrosLeer:any[]=[];
      for(let gatoPerdido of this.gatos){
        let nombreGato = gatoPerdido.nombre;
          perrosLeer.push(gatoPerdido)
      }

        this.router.navigate(['/gatoPerdido',nombre]);
      
    }

}
