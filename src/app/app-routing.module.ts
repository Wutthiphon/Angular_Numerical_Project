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
import { CramerComponent } from './components/linear_algebraic_equations/cramer/cramer.component';
import { GaussEliminationComponent } from './components/linear_algebraic_equations/gauss-elimination/gauss-elimination.component';
import { GaussJordanComponent } from './components/linear_algebraic_equations/gauss-jordan/gauss-jordan.component';
import { MatrixInversionComponent } from './components/linear_algebraic_equations/matrix-inversion/matrix-inversion.component';
import { LuDecompositionComponent } from './components/linear_algebraic_equations/lu-decomposition/lu-decomposition.component';
import { CholeskyDecompositionComponent } from './components/linear_algebraic_equations/cholesky-decomposition/cholesky-decomposition.component';
import { JacobiIterationComponent } from './components/linear_algebraic_equations/jacobi-iteration/jacobi-iteration.component';
import { GaussSeidelIterationComponent } from './components/linear_algebraic_equations/gauss-seidel-iteration/gauss-seidel-iteration.component';
import { ConjugateGradientComponent } from './components/linear_algebraic_equations/conjugate-gradient/conjugate-gradient.component';
// Interpolation & Extrapolation
import { NewtonDivideDifferenceComponent } from './components/interpolation_and_extrapolation/newton-divide-difference/newton-divide-difference.component';
import { LagrangeComponent } from './components/interpolation_and_extrapolation/lagrange/lagrange.component';
import { SplineComponent } from './components/interpolation_and_extrapolation/spline/spline.component';
// Least Squares Regression
import { LinearComponent } from './components/least_squares_regression/linear/linear.component';
import { PolynomialComponent } from './components/least_squares_regression/polynomial/polynomial.component';
import { MultipleLinearComponent } from './components/least_squares_regression/multiple-linear/multiple-linear.component';
// Integration & Differentiation
import { TrapezoidalComponent } from './components/integration_and_diff/trapezoidal/trapezoidal.component';
import { SimpsonComponent } from './components/integration_and_diff/simpson/simpson.component';

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
  { path: 'linear_algebraic_equations/cramer', component: CramerComponent },
  {
    path: 'linear_algebraic_equations/gauss_elimination',
    component: GaussEliminationComponent,
  },
  {
    path: 'linear_algebraic_equations/gauss_jordan',
    component: GaussJordanComponent,
  },
  {
    path: 'linear_algebraic_equations/matrix_inversion',
    component: MatrixInversionComponent,
  },
  {
    path: 'linear_algebraic_equations/lu_decomposition',
    component: LuDecompositionComponent,
  },
  {
    path: 'linear_algebraic_equations/cholesky_decomposition',
    component: CholeskyDecompositionComponent,
  },
  {
    path: 'linear_algebraic_equations/jacobi_iteration',
    component: JacobiIterationComponent,
  },
  {
    path: 'linear_algebraic_equations/gauss_seidel_iteration',
    component: GaussSeidelIterationComponent,
  },
  {
    path: 'linear_algebraic_equations/conjugate_gradient',
    component: ConjugateGradientComponent,
  },
  // Interpolation & Extrapolation
  {
    path: 'interpolation_and_extrapolation/newton_divide_difference',
    component: NewtonDivideDifferenceComponent,
  },
  {
    path: 'interpolation_and_extrapolation/lagrange',
    component: LagrangeComponent,
  },
  {
    path: 'interpolation_and_extrapolation/spline',
    component: SplineComponent,
  },
  // Least Squares Regression
  { path: 'least_squares_regression/linear', component: LinearComponent },
  {
    path: 'least_squares_regression/polynomial',
    component: PolynomialComponent,
  },
  {
    path: 'least_squares_regression/multiple_linear',
    component: MultipleLinearComponent,
  },
  // Integration & Differentiation
  {
    path: 'integration_and_diff/trapezoidal',
    component: TrapezoidalComponent,
  },
  { path: 'integration_and_diff/simpson', component: SimpsonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
