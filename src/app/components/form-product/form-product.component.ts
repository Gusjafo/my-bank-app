import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import {
  formatVisualToDateTime,
  formatDataTimeToVisual,
  isDateCorrect,
} from 'src/app/common/utils';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  newProduct!: FormGroup;
  doEditProduct: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newProductForm();
    if (this.route.snapshot.params['id']) {
      this.doEditProduct = true;
      const id = this.route.snapshot.params['id'];
      this.productsService.existProduct(id).subscribe({
        next: (response) => {
          if (response) {
            this.getProductById(id);
          } else console.log('El producto no se encuentra en el listado');
        },
        error: (err) => console.log('Error de servidor: ', err),
      });
    }
  }

  getProductById(id: string) {
    const product = this.productsService.getProductById(id);
    if (product) {
      this.newProduct.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release: formatDataTimeToVisual(product.date_release),
        date_revision: formatDataTimeToVisual(product.date_revision),
      });
    }
  }

  newProductForm(): void {
    this.newProduct = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, isDateCorrect]],
      date_revision: ['', [Validators.required, isDateCorrect]],
    });
  }

  save(): void {
    if (this.doEditProduct) {
      if (this.newProduct.dirty && this.newProduct.valid) {
        const p: Product = Object.assign({}, this.newProduct.value);
        p.date_release = formatVisualToDateTime(p.date_release);
        p.date_revision = formatVisualToDateTime(p.date_revision);
        this.productsService.editProduct(p).subscribe((response) => {
          this.newProduct.reset();
          this.router.navigate(['']);
        });
      } else if (!this.newProduct.dirty) {
        this.newProduct.reset();
      } else {
        console.log('El formulario no ha sido modificado o no es valido');
      }
    } else {
      if (this.newProduct.dirty && this.newProduct.valid) {
        const p = Object.assign({}, this.newProduct.value);
        p.date_release = formatVisualToDateTime(p.date_release);
        p.date_revision = formatVisualToDateTime(p.date_revision);
        this.productsService.newProduct(p).subscribe((response) => {
          this.newProduct.reset();
          this.router.navigate(['']);
        });
      } else if (!this.newProduct.dirty) {
        this.newProduct.reset();
      } else {
        console.log('El formulario no ha sido modificado o no es valido');
      }
    }
  }

  resetProduct(): void {
    this.newProduct.reset();
  }
}
