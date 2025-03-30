import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { ProductsService } from '@products/services/products.service';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent,RouterLink],
  templateUrl: './products-admin-page.component.html',
  styles: ``
})
export class ProductsAdminPageComponent {

  public productService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public productPerPage = signal(10)

  public productsResource = rxResource({
    request: () => ({page: this.paginationService.currentPage() -1, limit: this.productPerPage()}),
    loader: ({request}) => {
      return this.productService.getProducts({
        offset: request.page * 9,
        limit: request.limit
      })
    }
  });
}
