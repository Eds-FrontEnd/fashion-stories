import { IProducts } from './../../interfaces/iproducts';
import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../services/api-products.service';
import { take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false, // Altere para true
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  productsByPromise!: Promise<IProducts[]>;
  loading: boolean = true; // Variável de controle de loading

  constructor(private readonly _productService: ApiProductsService) {}

  ngOnInit() {
    this.productsByPromise = lastValueFrom(
      this._productService.getProducts(20).pipe(take(1))
    );

    // Espera os produtos carregarem e então atualiza o loading
    this.productsByPromise.then(() => {
      this.loading = false;
    });
  }

  getStars(rate: number) {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStar);
    return Array(fullStars)
      .fill('full')
      .concat(halfStar ? ['half'] : [], Array(emptyStars).fill('empty'));
  }
}
