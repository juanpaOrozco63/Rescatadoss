import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsuarioModel } from '../models/usuarioModel';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dbPath ='/usuarios';

  constructor(private db:AngularFirestore, private http:HttpClient) {
    this.usuarios=db.collection(this.dbPath)

   }
  usuarios:AngularFirestoreCollection<UsuarioModel>=null;
  createUsuarios(usuario:UsuarioModel){
   this.usuarios.add({...usuario})
      // console.log("Usuario creado en bd");
    }
    getUsuariosList():AngularFirestoreCollection<UsuarioModel>{
      
      return this.usuarios;
    }
    
}
