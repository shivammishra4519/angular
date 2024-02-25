import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddDeviceComponent } from './pages/add-device/add-device.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { ViewDevicesComponent } from './pages/view-devices/view-devices.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailComponent } from './pages/payment-fail/payment-fail.component';
import { LoginGuard } from './gaurd/login.guard';
import { AddDistributorComponent } from './pages/add-distributor/add-distributor.component';
import { ViewDistributorComponent } from './pages/view-distributor/view-distributor.component';

const routes: Routes = [
  { path: "sidebar", component: SidebarComponent,},
  { path: "login", component: LoginComponent },
  { path: "payment/success", component: PaymentSuccessComponent},
  { path: "payment/fail", component: PaymentFailComponent,},
  

  { path: '', redirectTo: '/login', pathMatch: 'full',}, 
  {path: "admin", component: DashBoardComponent,
    children: [
      
      { path: 'addDevice', component:AddDeviceComponent },
      {path:'userRegister',component:UserRegisterComponent},
      {path:'userlist',component:UserlistComponent},
      {path:'home',component:HomeComponent},
      {path:'addevice',component:AddDeviceComponent},
      {path:'viewdevice',component:ViewDevicesComponent},
      {path:'adddistributor',component:AddDistributorComponent},
      {path:'viewdistributor',component:ViewDistributorComponent},
      { path: "payment/:imeiNumber1", component: PaymentComponent},
      { path: '', component: HomeComponent }
    ]
  }, 
  // { path: 'name', component: DashBoardComponent, }



];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
