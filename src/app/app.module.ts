import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RatingModule } from 'primeng/rating';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { BlockUIModule } from 'primeng/blockui';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PickListModule } from 'primeng/picklist';
import { SkeletonModule } from 'primeng/skeleton';
import { BadgeModule } from 'primeng/badge';
import { EditorModule } from 'primeng/editor';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { JacobiIterationComponent } from './components/linear_algebraic_equations/jacobi-iteration/jacobi-iteration.component';
import { GaussSeidelIterationComponent } from './components/linear_algebraic_equations/gauss-seidel-iteration/gauss-seidel-iteration.component';
import { ConjugateGradientComponent } from './components/linear_algebraic_equations/conjugate-gradient/conjugate-gradient.component';
// Interpolation & Extrapolation
import { NewtonDivideDifferenceComponent } from './components/interpolation_and_extrapolation/newton-divide-difference/newton-divide-difference.component';
import { LagrangeComponent } from './components/interpolation_and_extrapolation/lagrange/lagrange.component';
import { SplineComponent } from './components/interpolation_and_extrapolation/spline/spline.component';
// Least Squares Regression
import { LinearComponent } from './components/least_squares_regression/linear/linear.component';
import { MultipleLinearComponent } from './components/least_squares_regression/multiple-linear/multiple-linear.component';
// Integration & Differentiation
import { TrapezoidalComponent } from './components/integration_and_diff/trapezoidal/trapezoidal.component';
import { SimpsonComponent } from './components/integration_and_diff/simpson/simpson.component';
import { DiffComponent } from './components/integration_and_diff/diff/diff.component';
// For Test
import { MatrixInverseComponent } from './for_test/matrix-inverse/matrix-inverse.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // Root Of Equations
    GraphicalComponent,
    BisectionComponent,
    FalsePositionComponent,
    OnePointIterationComponent,
    NewtonRaphsonComponent,
    SecantComponent,
    // Linear Algebraic Equations
    CramerComponent,
    GaussEliminationComponent,
    GaussJordanComponent,
    MatrixInversionComponent,
    LuDecompositionComponent,
    JacobiIterationComponent,
    GaussSeidelIterationComponent,
    ConjugateGradientComponent,
    // Interpolation & Extrapolation
    NewtonDivideDifferenceComponent,
    LagrangeComponent,
    SplineComponent,
    // Least Squares Regression
    LinearComponent,
    MultipleLinearComponent,
    // Integration & Differentiation
    TrapezoidalComponent,
    SimpsonComponent,
    DiffComponent,
    MatrixInverseComponent,
    // For Test
    MatrixInverseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // PrimeNG Modules
    MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    TabViewModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    InputNumberModule,
    TabMenuModule,
    StepsModule,
    AccordionModule,
    PanelModule,
    ListboxModule,
    TreeModule,
    TreeTableModule,
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    TieredMenuModule,
    SidebarModule,
    ScrollPanelModule,
    CarouselModule,
    GalleriaModule,
    FieldsetModule,
    InputMaskModule,
    SliderModule,
    ToggleButtonModule,
    RatingModule,
    KeyFilterModule,
    AutoCompleteModule,
    ChipsModule,
    ColorPickerModule,
    InputSwitchModule,
    VirtualScrollerModule,
    BlockUIModule,
    PanelMenuModule,
    MessagesModule,
    MessageModule,
    PickListModule,
    SkeletonModule,
    BadgeModule,
    EditorModule,
    ImageModule,
    DividerModule,
    SelectButtonModule,
    TimelineModule,
    AvatarModule,
    ChartModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
