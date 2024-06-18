import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MenuComponent } from './menu/menu.component';
import { DeclareComponent } from './declare/declare.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { FormationComponent } from './formation/formation.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'declare', component: DeclareComponent },
  { path: 'submenu', component: SubmenuComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'game', component: QuizComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
