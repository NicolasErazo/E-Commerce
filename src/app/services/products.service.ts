import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { retry, map, catchError, throwError } from 'rxjs';

import { CreateProductDTO, Product } from './../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `https://young-sands-07814.herokuapp.com/api`;

  constructor(
    private http: HttpClient
  ) { }

  getProductByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params }).pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products` + '/' + id);
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  updateProduct(id: string, dto: any) {
    return this.http.put<Product>(`${this.apiUrl}/products` + '/' + id, dto);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products` + '/' + id);
  }

}
