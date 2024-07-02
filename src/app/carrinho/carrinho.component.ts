import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinhoSerice: CarrinhoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoSerice.obtemCarrinho();
    this.calculaTotal()
  }

  calculaTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  removeProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoSerice.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
  }

  comprar(){
    alert("Parabéns, você finalizou sua compra!")
    this.carrinhoSerice.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

 }