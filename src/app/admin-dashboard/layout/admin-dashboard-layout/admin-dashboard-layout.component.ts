import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlPanelComponent } from "../../components/control-panel/control-panel.component";

@Component({
  imports: [RouterOutlet, ControlPanelComponent],
  templateUrl: './admin-dashboard-layout.component.html',
  styles: ``
})
export class AdminDashboardLayoutComponent {

}
