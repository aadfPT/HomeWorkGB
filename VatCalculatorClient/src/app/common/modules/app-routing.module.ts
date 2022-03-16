import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiCalculatorComponent } from 'src/app/api-calculator/api-calculator.component';
import { ClientCalculatorComponent } from 'src/app/client-calculator/client-calculator.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'api-calculator', component: ApiCalculatorComponent },
  { path: 'client-calculator', component: ClientCalculatorComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
