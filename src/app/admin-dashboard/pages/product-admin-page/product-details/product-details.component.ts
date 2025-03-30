import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { FormUtils } from '@utils/forms-utils';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { ProductsService } from '@products/services/products.service';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';


@Component({
  selector: 'admin-product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
  styles: ``
})
export class ProductDetailsComponent implements OnInit {


  public product = input.required<Product>();

  private router = inject(Router);
  private productService = inject(ProductsService);
  private fb = inject(FormBuilder);


  public wasSave = signal(false);
  public tempImages = signal<string[]>([]);
  public imageFileList: FileList | undefined = undefined;

  public imagesToCarrusel = computed(() => {
    const currentProductImages = [...this.product().images, ...this.tempImages()]
    return currentProductImages;
  })

  productForms = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[''],],
    images: [[''], []],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
    tags: ['', [Validators.required, Validators.minLength(2)]],
  });


  public sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  private setFormValue(formLike: Partial<Product>) {
    this.productForms.reset(this.product() as any)
    this.productForms.patchValue({ tags: formLike.tags?.join(',') })
  }

  public onSizeCLick(size: string) {

    const currenSize = this.productForms.value.sizes ?? []

    if (currenSize.includes(size)) {
      currenSize.splice(currenSize.indexOf(size), 1);
    } else {
      currenSize.push(size);
    }

    this.productForms.patchValue({ sizes: currenSize })
  }

  public async onSubmit() {

    const isValid = this.productForms.valid;
    this.productForms.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForms.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags
        ?.toLowerCase()
        .split(',')
        .map(tag => tag.trim()) ?? []
    }

    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productLike, this.imageFileList)
      );
      this.router.navigate(['/admin/products/', product.id]);

      this.wasSave.set(true)
    } else {
      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike,this.imageFileList)
      )
    }

    this.wasSave.set(true);
    setTimeout(() => {
      this.wasSave.set(false);
    }, 3000);
  }

  onFilesChange(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    const imageUrls = Array.from(fileList ?? []).map(file => {

      return URL.createObjectURL(file)
    });

    this.tempImages.set(imageUrls);
  }

}
