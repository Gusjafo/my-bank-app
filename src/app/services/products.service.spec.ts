import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { mockProduct, mockProductList } from '../common/mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    service['products'] = mockProductList;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products from the server', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProductList);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductList);
  });

  it('should return a product by id', () => {
    const productId = mockProductList[0].id;

    const result = service.getProductById(productId);

    expect(result).toEqual(mockProductList[0]);
  });

  it('should check if a product exists', () => {
    const productId = '1';

    service.existProduct(productId).subscribe((exists) => {
      expect(exists).toBe(true);
    });

    const req = httpTestingController.expectOne(
      `${service['url']}/verification?id=${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should edit a product', () => {
    service.editProduct(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('PUT');
    req.flush(true);
  });

  it('should add a new product', () => {
    service.newProduct(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${service['url']}?id=${productId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
