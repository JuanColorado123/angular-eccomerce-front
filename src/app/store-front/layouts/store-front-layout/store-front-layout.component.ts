import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@store-front/components/navbar/navbar.component';


@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './store-front-layout.component.html',
  styles: ``
})
export class StoreFrontLayoutComponent {

}
