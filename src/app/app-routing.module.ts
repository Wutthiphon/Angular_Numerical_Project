import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GraphicalMethodComponent } from './components/graphical-method/graphical-method.component';
import { BisectionMethodComponent } from './components/bisection-method/bisection-method.component';
import { FalsePositionComponent } from './components/false-position/false-position.component';
import { OnePointIterationComponent } from './components/one-point-iteration/one-point-iteration.component';
import { TaylorComponent } from './components/taylor/taylor.component';
import { NewtonRaphsonComponent } from './components/newton-raphson/newton-raphson.component';
import { CramerRuleComponent } from './components/cramer-rule/cramer-rule.component';
import { GaussEliminationComponent } from './components/gauss-elimination/gauss-elimination.component';
import { SecantComponent } from './components/secant/secant.component';
import { MatrixInversionComponent } from './components/matrix-inversion/matrix-inversion.component';
import { LUDecomposComponent } from './components/lu-decompos/lu-decompos.component';
import { ConjugateComponent } from './components/conjugate/conjugate.component';
import { InterpolationComponent } from './components/interpolation/interpolation.component';
import { ExtrapolationComponent } from './components/extrapolation/extrapolation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'graphical_method', component: GraphicalMethodComponent },
  { path: 'bisection_method', component: BisectionMethodComponent },
  { path: 'false_position', component: FalsePositionComponent },
  { path: 'one_point_iteration', component: OnePointIterationComponent },
  { path: 'taylor', component: TaylorComponent },
  { path: 'newton_raphson', component: NewtonRaphsonComponent },
  { path: 'cramer_rule', component: CramerRuleComponent },
  { path: 'gauss_elimination', component: GaussEliminationComponent },
  { path: 'secant', component: SecantComponent },
  { path: 'matrix_inversion', component: MatrixInversionComponent },
  { path: 'LU_decompos', component: LUDecomposComponent },
  { path: 'conjugate', component: ConjugateComponent },
  { path: 'interpolation', component: InterpolationComponent },
  { path: 'extrapolation', component: ExtrapolationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
