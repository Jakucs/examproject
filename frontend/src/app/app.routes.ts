import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { SuccessfulregisterComponent } from './successfulregister/successfulregister.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: 'register', component:  RegisterComponent },
    { path: 'successfulregister', component: SuccessfulregisterComponent},
    { path: 'products', component: ProductsComponent},
    { path: '', component: AppComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
