import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  productos: Producto[] = [];

  productoCarrito: Producto[] = [];

  sumaProductos = 0;
  listadoProductos = "";

  constructor(private productoService: ProductoService, private carritoService: CarritoService, private toastController: ToastController) { }

  ngOnInit() {
    this.productoService.getProductos().subscribe(
      respuesta => {
        this.productos = respuesta;
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  agregarProducto(producto: Producto){

    this.productoCarrito.push(producto);
    this.presentToast('Se agrego al carrito');
  }

  abrirCarrito(){
    this.carritoService.enviarListaCarrito(this.productoCarrito);
  }

}
