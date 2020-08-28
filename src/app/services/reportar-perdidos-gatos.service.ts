import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { reportarPerdidoModel } from '../models/reportar-perdido.model';

@Injectable({
  providedIn: 'root'
})
export class ReportarPerdidosGatosService {
  private dbPath ='/gatosPerdidos';
  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.gatosPerdidosRef=db.collection(this.dbPath, ref => ref.orderBy('fechaExtraviado','desc'))

  }
  gatosPerdidosRef:AngularFirestoreCollection<reportarPerdidoModel>=null;

  createGatosPerdidos(perdido:reportarPerdidoModel){
    this.gatosPerdidosRef.add({...perdido})
       
     }
     getGatosPerdidosList():AngularFirestoreCollection<reportarPerdidoModel>{
       
       return this.gatosPerdidosRef;
     }
     deleteGatosPerdidos(key:string):Promise<void>{
      return this.gatosPerdidosRef.doc(key).delete();
    }
}
  