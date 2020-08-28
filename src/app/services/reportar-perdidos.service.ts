import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reportarPerdidoModel } from '../models/reportar-perdido.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ReportarPerdidosService {
  private dbPath ='/perrosPerdidos';
  constructor(private db:AngularFirestore, private http:HttpClient) {
    this.perrosPerdidosRef=db.collection(this.dbPath, ref => ref.orderBy('fechaExtraviado','desc'))
    
  
   }
  perrosPerdidosRef:AngularFirestoreCollection<reportarPerdidoModel>=null;
   createPerrosPerdidos(perdido:reportarPerdidoModel){
    this.perrosPerdidosRef.add({...perdido})
       
     }
     getPerrosPerdidosList():AngularFirestoreCollection<reportarPerdidoModel>{
       
       return this.perrosPerdidosRef;
     }
     deletePerrosPerdidos(key:string):Promise<void>{
       return this.perrosPerdidosRef.doc(key).delete();
     }
     }
  
     

