import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CurrencyPipe } from '@angular/common';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, CurrencyPipe, RouterLink],
  templateUrl: './product-table.component.html',
  styles: ``
})
export class ProductTableComponent {

  public products = input.required<Product[]>();
}
