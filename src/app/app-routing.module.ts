import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(module => module.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(module => module.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules  //Precarga Todos los Modulos
    // preloadingStrategy: CustomPreloadService  //Precarga Modulos Customizados
    preloadingStrategy: QuicklinkStrategy //Precarga Modulos que aparecen en el viewport
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
