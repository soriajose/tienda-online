import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  
  listaCarrito : Producto[] = [];
  pedido = "";
  importeTotal: number = 0;
  suma = 0;
  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.carritoService.$getListaBehavierSubject.subscribe(
      respuesta => {
        this.listaCarrito = respuesta;
      }
    );

    for(var i = 0; i < this.listaCarrito.length; i++){
        this.suma += this.listaCarrito[i].price;
      }
    console.log("suma", this.suma)
  }


  quitarProducto(producto: Producto){
    
    let indice = 0;
    let contador = 0;

    for(var i = 0; i < this.listaCarrito.length; i++){
      if(this.listaCarrito[i].id === producto.id){
        indice = contador;
        this.suma -= this.listaCarrito[i].price;
      }
      contador++;
    }

    this.listaCarrito.splice(indice, 1);
    console.log('Se elimino el producto del carrito')
  }

  finalizarPedido(){


    for(var i = 0; i < this.listaCarrito.length; ++i){
      this.pedido +=  JSON.stringify("Producto: " + this.listaCarrito[i].title + " - Precio: $" + this.listaCarrito[i].price.toFixed(0)) + "\n\n";
      this.importeTotal += this.listaCarrito[i].price;
   }
    
     this.pedido += "\n\n\nTotal: $" + this.importeTotal;

    window.open(`https://wa.me/+5493825520391?text=${encodeURIComponent(this.pedido)}`);
    

  }

}
