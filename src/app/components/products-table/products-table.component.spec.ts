// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ProductsTableComponent } from './products-table.component';
// import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

// describe('ProductsTableComponent', () => {
//   let component: ProductsTableComponent;
//   let fixture: ComponentFixture<ProductsTableComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
//       declarations: [ProductsTableComponent, ProgressBarComponent],
//     });
//     fixture = TestBed.createComponent(ProductsTableComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsTableComponent } from './products-table.component';
import { ProductsService } from 'src/app/services/products.service';
import { mockProduct, mockProductList } from 'src/app/common/mocks';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'deleteProduct',
    ]);

    TestBed.configureTestingModule({
      declarations: [ProductsTableComponent, ProgressBarComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: ProductsService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products on ngOnInit', () => {
    productServiceSpy.getProducts.and.returnValue(of(mockProductList));

    component.ngOnInit();

    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.productList).toEqual(mockProductList);
    expect(component.totalPages).toEqual(6);
  });

  it('should set progress bar on changePage', () => {
    component.totalPages = 10;

    component.changePage(5);

    expect(component.currentPage).toEqual(5);
    expect(component.progress).toEqual(50);
  });

  it('should close dropdown on closeDropdown', () => {
    component.isDropdownVisible = true;

    component.closeDropdown();

    expect(component.isDropdownVisible).toEqual(false);
  });

  it('should toggle dropdown on toggleDropdown', () => {
    component.isDropdownVisible = false;

    component.toggleDropdown();

    expect(component.isDropdownVisible).toEqual(true);
  });

  it('should format date on formatDataTime', () => {
    const date = '2023-03-12T00:00:00.000+00:00';
    const formattedDate = component.formatDataTime(date);

    expect(formattedDate).toEqual('12/03/2023');
  });

  it('should show modal on showModal', () => {
    component.showModal(mockProduct);

    expect(component.productSelected).toEqual(mockProduct);
    expect(component.message).toEqual('Producto Inicial');
    expect(component.modalVisible).toEqual(true);
  });

  it('should close modal on closeModal', () => {
    component.modalVisible = true;

    component.closeModal();

    expect(component.modalVisible).toEqual(false);
  });
});
