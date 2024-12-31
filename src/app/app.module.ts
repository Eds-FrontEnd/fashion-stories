import { LOCALE_ID, NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Material Icons - Angular
import { MatIconModule } from '@angular/material/icon';
// API
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';

import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ButtonComponent } from './components/button/button.component';
import { ColecoesComponent } from './pages/colecoes/colecoes.component';
import { HomeComponent } from './pages/home/home.component';
import { NovidadesComponent } from './pages/novidades/novidades.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CountDirective } from './directives/count.directive';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    TruncatePipe,
    ButtonComponent,
    ColecoesComponent,
    HomeComponent,
    NovidadesComponent,
    SobreNosComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    CountDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(
      withFetch(), // Configura o uso da API fetch
      withInterceptorsFromDi() // Adiciona suporte a interceptadores do DI
    ),
    provideClientHydration(withEventReplay()),

    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
