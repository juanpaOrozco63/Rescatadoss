import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { reportarAdopcionModel } from '../models/reportarAdopcion.model';

@Injectable({
  providedIn: 'root'
})
export class ReportarAdopcionService {
  private dbPath ='/mascotasAdopcion';

  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.mascotasAdopcion=db.collection(this.dbPath)
  }
  mascotasAdopcion:AngularFirestoreCollection<reportarAdopcionModel>=null;
  createmascotasadopcions(adopcion:reportarAdopcionModel){
   this.mascotasAdopcion.add({...adopcion})
      
    }
    getmascotasadopcionsList():AngularFirestoreCollection<reportarAdopcionModel>{
      
      return this.mascotasAdopcion;
    }
    deleteMascotaAdopcion(key:string):Promise<void>{
      return this.mascotasAdopcion.doc(key).delete();
    }
  }
  
