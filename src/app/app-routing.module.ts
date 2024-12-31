import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColecoesComponent } from './pages/colecoes/colecoes.component';
import { HomeComponent } from './pages/home/home.component';
import { NovidadesComponent } from './pages/novidades/novidades.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'colecoes', component: ColecoesComponent },
  { path: 'novidades', component: NovidadesComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
