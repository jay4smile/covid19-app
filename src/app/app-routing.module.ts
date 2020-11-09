import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CovidInformationComponent } from './covid-information/covid-information.component';

const routes: Routes = [{ path: 'login', component: LoginComponent},
 { path: 'registration', component: RegistrationComponent},
 {path: 'covid-dashboard', component: CovidInformationComponent},
 { path: '', redirectTo: 'login', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
