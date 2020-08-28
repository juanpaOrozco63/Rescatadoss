import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { formularioAdopcionModel } from '../models/formularioAdopcion.model';

@Injectable({
  providedIn: 'root'
})
export class FormulariosAdopcionService {
  private dbPath ='/formularioRescatadoss';
  constructor(private db:AngularFirestore, private http:HttpClient) { 
    this.formularioAdopcion=db.collection(this.dbPath)
  }
  formularioAdopcion:AngularFirestoreCollection<formularioAdopcionModel>=null;
  
  createFormularioAdopcion(adopcion:formularioAdopcionModel){
   this.formularioAdopcion.add({...adopcion})
      
    }
    getFormularioAdopcionList():AngularFirestoreCollection<formularioAdopcionModel>{
      
      return this.formularioAdopcion;
    }
}
    