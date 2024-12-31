import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from './../interfaces/iproducts';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  private readonly apiUrl = 'https://fakestoreapi.com/products/';

  constructor(private readonly _http: HttpClient) {}

  // Método para retornar um array de produtos
  getProducts(limit: number): Observable<IProducts[]> {
    return this._http.get<IProducts[]>(`https://fakestoreapi.com/products?limit=${limit}`);
  }

  // Método para retornar um produto pelo ID
  getProductById(id: number): Observable<IProducts> {
    return this._http.get<IProducts>(`${this.apiUrl}${id}`);  // Corrigido para usar _http
  }
}
