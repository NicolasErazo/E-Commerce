import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { ReactiveFormsModule } from '@angular/forms';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component'; 

import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';

import { WebsiteRoutingModule } from './website-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
