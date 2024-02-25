import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDeviceComponent } from './pages/add-device/add-device.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { ViewDevicesComponent } from './pages/view-devices/view-devices.component';
import { UpdateDeviceDetailsComponent } from './pages/update-device-details/update-device-details.component';
import { ViewReportComponent } from './pages/view-report/view-report.component';
import { PaymentFailComponent } from './pages/payment-fail/payment-fail.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AddDistributorComponent } from './pages/add-distributor/add-distributor.component';
import { ViewDistributorComponent } from './pages/view-distributor/view-distributor.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashBoardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    AddDeviceComponent,
    UserRegisterComponent,
    UserlistComponent,
   ViewDevicesComponent,
   UpdateDeviceDetailsComponent,
   ViewReportComponent,
   PaymentFailComponent,
   PaymentSuccessComponent,
   PaymentComponent,
   AddDistributorComponent,
   ViewDistributorComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatPaginatorModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
