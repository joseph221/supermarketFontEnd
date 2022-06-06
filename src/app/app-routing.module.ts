import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { RoleguardGuard } from './shared/guard/roleguard.guard';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { CategorylistComponent } from './Viewss/categories/categoryList/categorylist/categorylist.component';
import { HomeComponent } from './Viewss/home/home.component';
import { LoginformComponent } from './Viewss/login/loginform/loginform.component';
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
  
  {path:'login',component:LoginformComponent},
  {
    path: 'main',
   component: DashboardComponent,
    canActivate:[AuthGuard],
   children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'Admin',
      component: UsersComponent,
      canActivate: [RoleguardGuard],
      data:{
        expectedRoles:['Admin']
      }
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
  {path:"sales-print",component:SalesPrintLayoutComponent},
  { path: '**', redirectTo: '/main/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
