import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './Viewss/home/home.component';
import { UsersComponent } from './Viewss/users/users.component';
import { ProductsComponent } from './Viewss/products/products.component';
import { MatCardModule} from '@angular/material/card';
import { CardComponent } from './shared/card/card.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { TableComponent } from './shared/table/table.component';
import { AddUserComponent } from './Viewss/users/add-user/add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './Viewss/update/update.component';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PosComponent } from './Viewss/pos/pos.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ProductFormComponent } from './Viewss/products/product_form/product-form/product-form.component';
import { MatSelectModule } from '@angular/material/select';
import { AddproductComponent } from './Viewss/products/Add_product/addproduct/addproduct.component';
import { EditFormComponent } from './Viewss/products/edit/edit-form/edit-form.component';
import { CategorylistComponent } from './Viewss/categories/categoryList/categorylist/categorylist.component';
import { CategoryformComponent } from './Viewss/categories/category_form/categoryform/categoryform.component';
import { ChartsModule } from 'ng2-charts';
import { ProTableComponent } from './Viewss/products/productTable/pro-table/pro-table.component';
import { StoreComponent } from './Viewss/store/store/store.component';
import { StoreFormComponent } from './Viewss/store/storeForm/store-form/store-form.component';
import { SalesComponent } from './Viewss/sales/sales/sales.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProPrintLatoutComponent } from './Viewss/products/productPrint/pro-print-latout/pro-print-latout.component';
import { StoreprintlayoutComponent } from './Viewss/store/print/storeprintlayout/storeprintlayout.component';
import { SalesPrintLayoutComponent } from './Viewss/sales/sales-print-layout/sales-print-layout.component';
import { ToastrModule} from 'ngx-toastr';
import { LoginformComponent } from './Viewss/login/loginform/loginform.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    ProductsComponent,
    CardComponent,
    TableComponent,
    AddUserComponent,
    UpdateComponent,
    UserFormComponent,
    PosComponent,
    ProductFormComponent,
    AddproductComponent,
    EditFormComponent,
    CategorylistComponent,
    CategoryformComponent,
    ProTableComponent,
    StoreComponent,
    StoreFormComponent,
    SalesComponent,
    ProPrintLatoutComponent,
    StoreprintlayoutComponent,
    SalesPrintLayoutComponent,
    LoginformComponent,
  
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatProgressBarModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule

    
    
  ],
  providers: [UsersComponent,UpdateComponent,ChartsModule],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent]
})
export class AppModule {}

