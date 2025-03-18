import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'details/:title/order', component: OrderComponent },
    { path: 'details/:title', component: DetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
]
