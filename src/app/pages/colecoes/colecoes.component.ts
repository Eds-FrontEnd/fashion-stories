import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colecoes',
  standalone: false,
  templateUrl: './colecoes.component.html',
  styleUrls: ['./colecoes.component.scss']
})
export class ColecoesComponent implements OnInit {
  colecoes = [
    {
      name: 'Coleção 1',
      description: 'Esta coleção é sobre moda urbana.',
      image: 'assets/colecao1.jpg'
    },
    {
      name: 'Coleção 2',
      description: 'Uma coleção elegante e sofisticada.',
      image: 'assets/colecao2.jpg'
    },
    {
      name: 'Coleção 3',
      description: 'Coleção inspirada nas cores do verão.',
      image: 'assets/colecao3.jpg'
    }
    // Adicione mais coleções conforme necessário
  ];

  constructor() {}

  ngOnInit(): void {}

  viewCollection(colecao: any) {
    alert(`Exibindo coleção: ${colecao.name}`);
  }
}
