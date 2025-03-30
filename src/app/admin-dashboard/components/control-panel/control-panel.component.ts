import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'admin-control-panel',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './control-panel.component.html',
  styles: ``
})
export class ControlPanelComponent {
  public authService = inject(AuthService);

}
