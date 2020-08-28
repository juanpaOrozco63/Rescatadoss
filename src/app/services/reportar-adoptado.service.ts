import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { reportarAdopcionModel } from '../models/reportarAdopcion.model';
@Injectable({
  providedIn: 'root'
})
export class ReportarAdoptadoService {
  private dbPath ='/mascotasAdoptadas';

  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.mascotaAdoptada=db.collection(this.dbPath)
  }
  mascotaAdoptada:AngularFirestoreCollection<reportarAdopcionModel>=null;
  createmascotaAdoptadas(adoptado:reportarAdopcionModel){
   this.mascotaAdoptada.add({...adoptado}) 
    }
    getmascotaAdoptadasList():AngularFirestoreCollection<reportarAdopcionModel>{
  
      return this.mascotaAdoptada;
    }
    deleteMascotaAdoptada(key:string):Promise<void>{
      return this.mascotaAdoptada.doc(key).delete();
    }
}
