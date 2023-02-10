import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { FilesService } from 'src/app/services/files.service';

import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  imageDefault = './assets/images/default.png';
  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  imgRta: string = '';

  @Input() products: Product[] = [];
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetails(id);
    }
  }

  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();

  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

  loadMore() {
    this.onLoadMore.emit();
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private fileService: FilesService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {

  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetails(id: string) {
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id).subscribe(data => {
      this.productChosen = data;
    }, err => {
      this.statusDetail = 'error';
      Swal.fire({
        title: err.error.error,
        text: err.error.message,
        icon: this.statusDetail,
        confirmButtonText: 'Ok'
      })
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nicolas Erazo',
      price: 1000,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      description: 'Hola Mundo',
      categoryId: 3
    }
    this.productsService.createProduct(product).subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Producto editado por: Nicolas Erazo'
    }
    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }


  downloadPDF() {
    this.fileService.getFile('NicolasErazo.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
        Swal.fire(
          'Good job!',
          'You uploaded the file successfully!',
          'success'
        )
      });
    }
  }

}
