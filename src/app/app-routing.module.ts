import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './catalogue/detail-product/detail-product.component';
import { DetailLivraisonComponent } from './connexion/detail-livraison/detail-livraison.component';
import { AuthGuard } from './connexion/guards/auth.guard';
import { ListLivraisonsComponent } from './connexion/list-livraisons/list-livraisons.component';
import { LoginComponent } from './connexion/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./catalogue/catalogue.module').then( m => m.CataloguePageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'produit/:id',
    component: DetailProductComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  // {
  //   path: 'livraison',
  //   component: ListLivraisonsComponent,
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'livraison',
    loadChildren: () => import('./livraison/livraison.module').then( m => m.LivraisonPageModule)
  },
  {
    path: 'livraison/:id',
    component: DetailLivraisonComponent,
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'commandes',
    loadChildren: () => import('./commandes/commandes.module').then( m => m.CommandesPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
