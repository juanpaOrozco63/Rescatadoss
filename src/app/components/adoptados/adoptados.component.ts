import { Component, OnInit } from '@angular/core';
import { ReportarAdopcionService } from 'src/app/services/reportar-adopcion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoptados',
  templateUrl: './adoptados.component.html',
  styleUrls: ['./adoptados.component.css']
})
export class AdoptadosComponent implements OnInit {
  perros: any[]=new Array<any>();
  buscar:string=''
  validar:boolean=false
  cargando = false
  constructor(private encontrado:ReportarAdopcionService,private db:AngularFirestore,private router:Router) { }

  ngOnInit() {
    this.db.collection('mascotasAdoptadas').valueChanges().subscribe(resp=>{
      // console.log(resp);
      this.perros = resp;
      setTimeout(() => {
        this.cargando=true
        
      }, 500);
    })
  }

    buscarPerro2(nombre:String){
      let perrosLeer:any[]=[];
      for(let prroEncontrado of this.perros){
        // console.log(prroEncontrado);
        let nombrePerro = prroEncontrado.nombre;
          perrosLeer.push(prroEncontrado)
      }

        this.router.navigate(['/adoptado',nombre]);
        // console.log(perrosLeer);
      
    }


}
