import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL } from '../common/urls';

const headers = new HttpHeaders({
  authorId: 100,
});

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url: string = URL;
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers }).pipe(
      tap((products: Product[]) => {
        this.products = products
      })
    )
  }

  getProductById(id: string): Product |undefined {
    return this.products.find(a => a.id === id)
  }

  existProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/verification?id=${id}`);
  }

  editProduct(data: Product): Observable<Response> {
    return this.http
      .put(this.url, data, { headers })
      .pipe(map((response: any) => response));
  }

  newProduct(data: Product): Observable<Response> {
    return this.http
      .post(this.url, data, { headers })
      .pipe(map((response: any) => response));
  }

  deleteProduct(id: string): Observable<any> {
    const params = new HttpParams().set('id', id)
    return this.http
      .delete(this.url, { headers: headers, params: params, responseType: 'text' })
      .pipe(map((response: any) => response));
  }
}
