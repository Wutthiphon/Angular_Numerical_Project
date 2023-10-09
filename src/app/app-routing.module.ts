import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
// Root Of Equations
import { GraphicalComponent } from './components/root_of_equation/graphical/graphical.component';
import { BisectionComponent } from './components/root_of_equation/bisection/bisection.component';
import { FalsePositionComponent } from './components/root_of_equation/false-position/false-position.component';
import { OnePointIterationComponent } from './components/root_of_equation/one-point-iteration/one-point-iteration.component';
import { NewtonRaphsonComponent } from './components/root_of_equation/newton-raphson/newton-raphson.component';
import { SecantComponent } from './components/root_of_equation/secant/secant.component';
// Linear Algebraic Equations
// Interpolation
import { NewtonDivideDifferenceComponent } from './components/interpolation_and_extrapolation/newton-divide-difference/newton-divide-difference.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Root Of Equations
  { path: 'root_of_quations/graphical', component: GraphicalComponent },
  { path: 'root_of_quations/bisection', component: BisectionComponent },
  {
    path: 'root_of_quations/false_position',
    component: FalsePositionComponent,
  },
  {
    path: 'root_of_quations/one_point_iteration',
    component: OnePointIterationComponent,
  },
  {
    path: 'root_of_quations/newton_raphson',
    component: NewtonRaphsonComponent,
  },
  { path: 'root_of_quations/secant', component: SecantComponent },
  // Linear Algebraic Equations
  // Interpolation
  {
    path: 'interpolation_and_extrapolation/newton_divide_difference',
    component: NewtonDivideDifferenceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
