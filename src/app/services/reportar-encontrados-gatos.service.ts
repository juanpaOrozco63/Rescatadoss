import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { reportarEncontradoModel } from '../models/reportarEncontrado';
@Injectable({
  providedIn: 'root'
})
export class ReportarEncontradosGatosService {
  private dbPath ='/gatosEncontrados';

  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.gatosEncontrados=db.collection(this.dbPath , ref => ref.orderBy('fechaVisto','desc'))

  }
  gatosEncontrados:AngularFirestoreCollection<reportarEncontradoModel>=null;

  createGatosEncontrados(perdido:reportarEncontradoModel){
    this.gatosEncontrados.add({...perdido})
       
     }
     getGatosEncontradosList():AngularFirestoreCollection<reportarEncontradoModel>{
       
       return this.gatosEncontrados;
     }
     deleteGatosEncontrado(key:string):Promise<void>{
      return this.gatosEncontrados.doc(key).delete();
    }  
}
