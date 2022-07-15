import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'session', component: SessionComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
