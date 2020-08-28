import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { reportarEncontradoModel } from '../models/reportarEncontrado';
@Injectable({
  providedIn: 'root'
})
export class ReportarEncontradosService {
  private dbPath ='/perrosEncontrados';
  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.perrosEncontradosRef=db.collection(this.dbPath , ref => ref.orderBy('fechaVisto','desc'))
  }
  perrosEncontradosRef:AngularFirestoreCollection<reportarEncontradoModel>=null;
   createPerrosEncontrados(encontrado:reportarEncontradoModel){
    this.perrosEncontradosRef.add({...encontrado})
       
     }
     getPerrosEncontradosList():AngularFirestoreCollection<reportarEncontradoModel>{
       
       return this.perrosEncontradosRef;
     }
     
     deletePerrosEncontrados(key:string):Promise<void>{
      return this.perrosEncontradosRef.doc(key).delete();
    }   
}
