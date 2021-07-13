import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-admin-produto',
  templateUrl: './admin-produto.component.html',
  styleUrls: ['./admin-produto.component.css']
})
export class AdminProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  listaProdutos: Produtos[]

  idCategoria: number
  listaCategorias: Categoria[]
  categoria: Categoria = new Categoria()

  constructor(public auth: AuthService, 
    private router: Router, 
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService
    ) { }

  ngOnInit() {
    if (environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    if (environment.nome != "admin"){
      alert("Você precisa ser administrador para acesar essa rota")
      this.router.navigate(['/home'])
    }

    this.produtosService.refreshToken()

    this.findAllProduto()
    this.getAllCategorias()
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    })
  }

  findAllProduto(){
    this.produtosService.getAllProduto().subscribe((resp: Produtos[])=>{
      this.listaProdutos = resp
    })
  }
  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp

      this.produto.categoria = resp
      
    
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
