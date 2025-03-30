import { Component, inject } from '@angular/core';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';

import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {
  private productService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public productsResource = rxResource({
    request: () => ({page: this.paginationService.currentPage() -1}),
    loader: ({request}) => {
      return this.productService.getProducts({
        offset: request.page * 9
      })
    }
  });

}


