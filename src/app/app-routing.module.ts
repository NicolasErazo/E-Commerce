import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './website/pages/login/login.component';
import { RegisterComponent } from './website/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(module => module.WebsiteModule),
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
    path: 'login',
    //   // canDeactivate: [ExitGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    //   // canDeactivate: [ExitGuard],
    component: RegisterComponent
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
