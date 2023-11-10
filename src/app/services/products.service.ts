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

  // getProducts(): Observable<any> {
  //   return of(temp);
  // }

  // TODO: poner el tipo devuelto al descomentar
  // y borrar  el mock
  getProductById(id: string): any {
    return this.products.find(a => a.id === id)
    // return temp.find((a) => a.id === id);
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

const temp = [
  {
    id: 'trj-crd-0',
    name: 'Producto Inicial',
    description: 'description del producto',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2020-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-1',
    name: 'Tarjetas de Credito',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-2',
    name: 'Segundo Producto Card',
    description: 'Segundo producto descripción',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-3',
    name: 'Producto de prueba',
    description: 'Descripción de producto de prueba',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-4',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-5',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-6',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-7',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-8',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-9',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-10',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-11',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-12',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-13',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-14',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-15',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-16',
    name: 'Tarjetas de Credito PARTE 0',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'prudcto-01',
    name: 'Producto Nuevo',
    description: 'Descripción del producto',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-10-31T00:00:00.000+00:00',
    date_revision: '2023-11-11T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd-17',
    name: 'Producto Nuevo',
    description: 'Descripción del producto',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-11-04T00:00:00.000+00:00',
    date_revision: '2024-11-05T00:00:00.000+00:00',
  },
  {
    id: 'prudcto-02',
    name: 'Prueba Producto',
    description: 'Descripción del producto',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-11-04T00:00:00.000+00:00',
    date_revision: '2024-11-04T00:00:00.000+00:00',
  },
  {
    id: 'prudcto-03',
    name: 'Producto Tercera Parte',
    description: 'Esto es una descripción producto 3ra parte',
    logo: 'prueba-img.jpg',
    date_release: '2023-11-05T00:00:00.000+00:00',
    date_revision: '2024-11-05T00:00:00.000+00:00',
  },
  {
    id: '',
    name: 'Producto Jest',
    description: 'Prueba del servicio con Jest',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'ada-2',
    name: '',
    description: 'Prueba del servicio con Jest',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'ada-20',
    name: 'Pruebaaaaa',
    description: '',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'ada-30',
    name: 'Pruebaaaaa',
    description: '',
    logo: '',
    date_release: '2023-03-11T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
  {
    id: 'prueba-01',
    name: 'Producto Nuevo',
    description: 'Descripción del producto',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-11-05T00:00:00.000+00:00',
    date_revision: '2024-11-05T00:00:00.000+00:00',
  },
  {
    id: 'ultimo-01',
    name: 'Producto Ultimo',
    description: 'Descripción ultima',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-11-06T00:00:00.000+00:00',
    date_revision: '2024-11-06T00:00:00.000+00:00',
  },
  {
    id: '1231',
    name: 'rancher local',
    description: 'a da ad ad as dasd a da as sdaas',
    logo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3AVisa_Inc._logo.svg&psig=AOvVaw1-GIRedl6fXI07jxBWy7mR&ust=1697118383902000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjqv-WQ7oEDFQAAAAAdAAAAABAD',
    date_release: '2023-11-16T00:00:00.000+00:00',
    date_revision: '2024-11-16T00:00:00.000+00:00',
  },
];
