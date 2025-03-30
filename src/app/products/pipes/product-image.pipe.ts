import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(value: null | string | string[]): string {

    if(value === null){
      return 'assets/images/svg/no-image.svg';
    }

    if(typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`
    }

    const imageUrl = value.at(0);

    if(!imageUrl){
      return 'assets/images/svg/no-image.svg'
    }
    return `${baseUrl}/files/product/${imageUrl}`;
  }
}
