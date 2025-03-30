import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styles: ``
})
export class PaginationComponent {

  public currentPage = input<number>(1);
  public pages = input(0)

  public activePage = linkedSignal(this.currentPage);

  getPageList = computed(() => {
    return Array.from({length: this.pages()}, ( _, i) => i + 1 )
  })
}
