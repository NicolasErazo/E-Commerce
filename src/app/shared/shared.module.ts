import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';

import { ReversePipe } from '../website/pipes/reverse.pipe';
import { TimeAgoPipe } from '../website/pipes/time-ago.pipe';
import { HighlightDirective } from '../shared/directives/directives/highlight.directive';



@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    SwiperModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductsComponent
  ]
})
export class SharedModule { }
