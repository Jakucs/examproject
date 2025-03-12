import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { SuccessfulregisterComponent } from './successfulregister/successfulregister.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, outlet: 'top'},
    { path: "logout", component: LogoutComponent, outlet: 'top' },
    { path: 'register', component:  RegisterComponent, outlet: 'top' },
    { path: 'successfulregister', component: SuccessfulregisterComponent, outlet: 'top'},
    { path: 'cart', component: CartComponent, outlet: 'top'},
    { path: 'products', component: ProductsComponent},
    { path: 'aboutus', component: AboutusComponent},
    { path: 'footer', component: FooterComponent},
    { path: '', component: AppComponent },
    { path: 'adminsite', component: AdminComponent, outlet: 'admin'},
    { path: 'superadminsite', component: SuperadminComponent, outlet: 'admin'},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
