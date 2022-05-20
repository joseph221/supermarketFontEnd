import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { CategorylistComponent } from './Viewss/categories/categoryList/categorylist/categorylist.component';
import { HomeComponent } from './Viewss/home/home.component';
import { PosComponent } from './Viewss/pos/pos.component';
import { AddproductComponent } from './Viewss/products/Add_product/addproduct/addproduct.component';
import { ProPrintLatoutComponent } from './Viewss/products/productPrint/pro-print-latout/pro-print-latout.component';
import { ProductsComponent } from './Viewss/products/products.component';
import { SalesPrintLayoutComponent } from './Viewss/sales/sales-print-layout/sales-print-layout.component';
import { SalesComponent } from './Viewss/sales/sales/sales.component';
import { StoreprintlayoutComponent } from './Viewss/store/print/storeprintlayout/storeprintlayout.component';
import { StoreComponent } from './Viewss/store/store/store.component';
import { UpdateComponent } from './Viewss/update/update.component';
import { AddUserComponent } from './Viewss/users/add-user/add-user.component';
import { UsersComponent } from './Viewss/users/users.component';

const routes: Routes = [
  {
    path: '',
   component: DashboardComponent,
   children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'category',
      component: CategorylistComponent
    },
    {
      path: "product",
      component: ProductsComponent
    },
    {
      path: "adduser",
      component: AddUserComponent
    },
    {
      path: "update/:id",
      component: UpdateComponent
    },
    {
      path: "pos",
      component: PosComponent
    },
    {path:"addProduct",component:AddproductComponent},
    {path:"store", component:StoreComponent},
    {path:"sales", component:SalesComponent},
    
    
   ]
  },
  {path:"product-print",component:ProPrintLatoutComponent},
  {path:"store-print",component:StoreprintlayoutComponent},
  {path:"sales-print",component:SalesPrintLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
