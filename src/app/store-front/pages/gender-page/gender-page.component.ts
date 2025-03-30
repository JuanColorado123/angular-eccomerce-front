import { ActivatedRoute } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {rxResource} from '@angular/core/rxjs-interop';

import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';

@Component({
  imports: [ProductCardComponent, I18nPluralPipe, PaginationComponent],
  templateUrl: './gender-page.component.html',
  styles: ``
})
export class GenderPageComponent {

  private route =  inject(ActivatedRoute);
  private productService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
    )
  )

  public gendersMap= signal({
    '=men': 'Hombres',
    '=woman': 'Mujeres',
    '=kid': 'Niños',
  })

  public productGenderResource = rxResource({
    request: () => ({gender : this.gender(), page : this.paginationService.currentPage()}),
    loader: ({request}) => this.productService.getProducts({
      offset: request.page,
      gender: request.gender
    })
  });
}
