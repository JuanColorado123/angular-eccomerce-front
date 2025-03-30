import { SlicePipe } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';

import { ProductImagePipe } from '@products/pipes/product-image.pipe';
@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
  styles: `figure img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  `
})
export class ProductCardComponent {
  private router = inject(Router);
  public product = input.required<Product>()

  goToProduct(){
    this.router.navigate(['/product', this.product().slug])
  }
}
