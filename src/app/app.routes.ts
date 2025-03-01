import { Routes } from '@angular/router';
import { AuthNavbarComponent } from './layouts/auth-navbar/auth-navbar.component';
import { BlankNavbarComponent } from './layouts/blank-navbar/blank-navbar.component';
import { isloggedGuard } from './core/guards/islogged/islogged.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },

  {
    path: '',
    component: AuthNavbarComponent,
    children: [
      {
        path: 'Login',
        loadComponent: () =>
          import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
        canActivate:[loggedGuard],
      },
      {
        path: 'Register',
        loadComponent: () =>
          import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
      }
      ,
      {
        path: 'Forget',
        loadComponent: () =>
          import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent),
        title: 'Forget Password'
      }
    ]
  },

  {
    path: '',
    component: BlankNavbarComponent,
    children: [
      {
        path: 'Home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
        canActivate:[isloggedGuard]
      },
      {
        path: 'Products',
        loadComponent: () =>
          import('./pages/products/products.component').then(m => m.ProductsComponent),
        title: 'Products'
      },
      {
        path: 'Cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart'
      },
      {
        path: 'Brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands'
      },
      {
        path: 'Categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories'
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'All Orders'
      },
      {
        path: 'Checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'Checkout'
      },
      {
        path: 'Details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(m => m.DetailsComponent),
        title: 'Details'
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Error 404'
      }
    ]
  }
];

