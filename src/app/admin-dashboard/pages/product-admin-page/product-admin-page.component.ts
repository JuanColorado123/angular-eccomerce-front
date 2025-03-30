import { ActivatedRoute, Router } from '@angular/router';
import { Component, effect, inject } from '@angular/core';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { ProductsService } from '@products/services/products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';


@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
  styles: ``
})
export class ProductAdminPageComponent {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductsService);

  private productId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  )

  public productResource = rxResource({
    request: () => ({id: this.productId()}),
    loader: ({request}) => this.productService.getProductById(request.id)
  })

  private redirectEffect = effect(() => {
    if(this.productResource.error()){
      this.router.navigateByUrl('/admin/products')
    }
  })
}
