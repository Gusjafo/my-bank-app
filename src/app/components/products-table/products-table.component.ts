import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ICONS_PATH } from 'src/app/common/paths';
import { formatDataTimeToVisual } from 'src/app/common/utils';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {

  isDropdownVisible: boolean = false;
  iconPath: string = `${ICONS_PATH}ellipsis-vertical-solid.svg`;
  productList: Product[] = [];
  productListFiltered: Product[] = [];
  currentPage: number = 1;
  productsPerPage: number = 5;
  productsPerPageArray: number[] = [5, 10, 20];
  totalPages: number = 1;
  progress: number = 0;
  modalVisible = false;
  message: string = '';
  productSelected!: Product;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productList = products;
      },
      error: (err) => console.log(err),
      complete: () => {
        this.calculateTotalPages();
        this.setProgressBar();
        this.productListFiltered = this.productList;
      },
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.productList.length / this.productsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
    this.setProgressBar();
  }

  setProgressBar(): void {
    this.progress = (this.currentPage * 100) / this.totalPages;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  formatDataTime(data: string) {
    return formatDataTimeToVisual(data);
  }

  showModal(product: Product) {
    this.productSelected = product;
    this.message = product.name;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productSelected.id).subscribe({
      next: (response) => {},
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.currentPage = 1;
        this.getProducts();
      },
    });
    this.closeModal();
  }

  filterProducts(key: string) {
    this.productListFiltered = this.productList.filter(
      (product) =>
        product.name.includes(key) ||
        product.description.includes(key) ||
        product.id.includes(key)
    );
  }

}
