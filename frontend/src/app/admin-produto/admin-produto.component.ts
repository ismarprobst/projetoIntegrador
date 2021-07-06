import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-admin-produto',
  templateUrl: './admin-produto.component.html',
  styleUrls: ['./admin-produto.component.css']
})
export class AdminProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  listaProdutos: Produtos[]

  constructor(public auth: AuthService, 
    private router: Router, 
    private produtosService: ProdutosService
    ) { }

  ngOnInit() {
    if (environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.produtosService.refreshToken()

    this.findAllProduto()
  }

  findAllProduto(){
    this.produtosService.getAllProduto().subscribe((resp: Produtos[])=>{
      this.listaProdutos = resp
    })
  }

  cadastrarProduto(){
    this.produtosService.postProduto(this.produto).subscribe((resp: Produtos)=>{
      this.produto = resp
      alert("Produto cadastrado com sucesso")
      this.findAllProduto()
      this.produto = new Produtos()
    })
  }

}
