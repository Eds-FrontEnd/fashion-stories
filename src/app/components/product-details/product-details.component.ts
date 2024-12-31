import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductsService } from '../../services/api-products.service';
import { IProducts } from './../../interfaces/iproducts';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<IProducts>;
  productId!: number;
  quantity: number = 1; // Quantidade inicial do produto
  totalPrice: number = 0; // Preço total baseado na quantidade

  constructor(
    private readonly _productService: ApiProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;

      this.product$ = this._productService.getProductById(this.productId).pipe(
        catchError((error) => {
          console.error('Erro ao buscar produto:', error);
          return of();
        })
      );

      // Calcular o preço total logo após o produto ser carregado
      this.product$.subscribe((product) => {
        this.calculateTotalPrice(product);
      });
    } else {
      console.error('ID do produto não encontrado na URL');
      this.product$ = of();
    }
  }

  // Função chamada ao clicar no botão "Comprar agora"
  buyNow(product: IProducts): void {
    if (typeof window !== 'undefined') {
      // Obter o carrinho atual do localStorage
      const storedCart = localStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      // Garantir que o carrinho seja um array
      if (!Array.isArray(cart)) {
        cart = [];
      }

      // Verificar se o produto já está no carrinho
      const existingProduct = cart.find((item: any) => item.product.id === product.id);

      if (existingProduct) {
        // Se o produto já existe, atualizar a quantidade
        existingProduct.quantity += this.quantity;
      } else {
        // Caso contrário, adicionar um novo produto ao carrinho
        cart.push({
          product: {
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price
          },
          quantity: this.quantity
        });
      }

      // Atualizar o localStorage com o carrinho atualizado
      localStorage.setItem('cart', JSON.stringify(cart));

      // Navegar para a página de checkout
      this.router.navigate(['/checkout']);
    } else {
      console.warn('localStorage não está disponível.');
    }
  }

  // Função para controlar a quantidade do produto
  changeQuantity(product: IProducts, change: number): void {
    // Modificar a quantidade, respeitando os limites
    if (this.quantity + change > 0) {
      this.quantity += change;
      this.calculateTotalPrice(product); // Atualizar o preço total
    }
  }

  // Função para calcular o preço total baseado na quantidade
  calculateTotalPrice(product: IProducts): void {
    this.totalPrice = product.price * this.quantity;
  }
}
