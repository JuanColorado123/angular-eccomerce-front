import { Routes } from "@angular/router";
import { AdminDashboardLayoutComponent } from "./layout/admin-dashboard-layout/admin-dashboard-layout.component";
import { ProductsAdminPageComponent } from "./pages/products-admin-page/products-admin-page.component";
import { ProductAdminPageComponent } from "./pages/product-admin-page/product-admin-page.component";



export const AdminDashboardRoute : Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    children:[
      {
        path: 'products',
        component: ProductsAdminPageComponent
      },
      {
        path: 'products/:id',
        component: ProductAdminPageComponent
      },
      {
        path: '**',
        redirectTo: 'products',
      }
    ]
  }
]

export default AdminDashboardRoute;
