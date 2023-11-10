import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-root/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { ModalComponent } from './components/shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsTableComponent,
    FormProductComponent,
    ProgressBarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
