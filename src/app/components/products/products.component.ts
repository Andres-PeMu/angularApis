import { Component, OnInit } from '@angular/core';

import { Product, createProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail: boolean = false;
  productChossen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit = 10;
  offset = 1;
  statusDetile: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = data;
      });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetalle(id: string) {
    this.statusDetile = 'loading';
    this.productsService.getProduct(id)
    .subscribe((data) => {
      this.toggleProductDetail();
      this.productChossen = data;
      this.statusDetile = 'success';
    },error => {
      window.alert(error)
      this.statusDetile = 'error';
    }
    );
  }

  createNewProduc() {
    const product: createProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: ['https://placeimg.com/640/680/any'],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes = {
      title: 'nuevo titulo',
    };
    const id = this.productChossen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex((item) => {
        item.id === this.productChossen.id;
        this.products[productIndex] = data;
      });
    });
  }

  deleteProduct() {
    const id = this.productChossen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex((item) => {
        item.id === this.productChossen.id;
      });
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
