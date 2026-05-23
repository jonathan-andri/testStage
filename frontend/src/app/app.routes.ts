import { Routes } from '@angular/router';
import { UsersComponent } from './components/user/user';
import { EntitiesComponent } from './components/entity/entity';
 
export const routes: Routes = [
  { path: '',                  redirectTo: 'users', pathMatch: 'full' },
  { path: 'users',             component: UsersComponent },
  { path: 'entities',          component: EntitiesComponent }
];
 