import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private behavierSubject = new BehaviorSubject<Producto[]>([]);
  
  $getListaBehavierSubject = this.behavierSubject.asObservable();

  constructor() { }



  enviarListaCarrito(lista: Producto[]){
    
    this.behavierSubject.next(lista);
  }


}
