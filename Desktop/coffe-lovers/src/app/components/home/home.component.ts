import { Component } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showFiller: boolean = false;
  productos: any = [];
  constructor(
    private productsService: ProductsService
  ) { 
    // validate if the user is logged in localstorage
    if(localStorage.getItem('user')) {
      this.showFiller = true;
    }else {
      console.log('No hay usuario');
      this.showFiller = false;
    }
  }

  ngOnInit(){
    // obtener los productos
    this.productsService.getProducts().subscribe(data => {
      // print products from firebase
      this.productos = data;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.showFiller = false;
  }


}
