import { Routes } from '@angular/router';
import { MenuComponent } from './components/admin/menu/menu.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AdminauthGuard } from './guards/admin/adminauth.guard';
import { UnauthorizedComponent } from './components/admin/unauthorized/unauthorized.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { userauthGuard } from './guards/user/userauth.guard';
export const routes: Routes = [

    {path:'profile', 
        loadComponent:()=> import('./components/user/profile/user-profile/user-profile.component')
      .then(module => module.UserProfileComponent),
    canActivate: [userauthGuard]
    },

    {path:'login', 
        loadComponent:()=> import('./components/user/login/login.component')
        .then(module=>module.LoginComponent)
    },
    {path: 'register', 
        loadComponent: () => import('./components/user/registration/registration.component')
        .then(module => module.RegistrationComponent)
    },
    {path: 'admin/menu', component: MenuComponent, canActivate: [AdminauthGuard], data: {expectedRole: 'admin'}},
    {path: 'admin/login', component: AdminLoginComponent},
    {path: 'admin/unauthorised', component: UnauthorizedComponent},
];
