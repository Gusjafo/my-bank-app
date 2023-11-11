import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormProductComponent } from './form-product.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = {
      snapshot: { params: { id: '1' } },
    };

    const spy = jasmine.createSpyObj('ProductsService', [
      'existProduct',
      'getProductById',
      'newProduct',
      'editProduct',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [FormProductComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ProductsService, useValue: spy },
        FormBuilder,
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and retrieve product on edit', fakeAsync(() => {
    productsServiceSpy.existProduct.and.returnValue(of(true));
    const mockProduct = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '12/03/2023', date_revision: '12/03/2023' };
    productsServiceSpy.getProductById.and.returnValue(mockProduct);

    component.ngOnInit();
    tick();

    expect(component.newProduct.value.id).toBe('1');
    expect(component.newProduct.value.name).toBe('Product 1');
  }));

  it('should log a message if the product is not in the list', fakeAsync(() => {
    productsServiceSpy.existProduct.and.returnValue(of(false));
    spyOn(console, 'log');

    component.ngOnInit();
    tick();

    expect(console.log).toHaveBeenCalledWith('El producto no se encuentra en el listado');
  }));


});
