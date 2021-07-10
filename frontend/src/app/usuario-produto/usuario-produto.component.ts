import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-usuario-produto',
  templateUrl: './usuario-produto.component.html',
  styleUrls: ['./usuario-produto.component.css']
})
export class UsuarioProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  listaProdutos: Produtos[]

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number
  

  constructor(public auth: AuthService, 
    private router: Router, 
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    if (environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/usuario-produto'])
    }

    this.getAllCategoria()

    this.produtosService.refreshToken()

    this.findAllProdutos()
  }

  findAllProdutos(){
    this.produtosService.getAllProduto().subscribe((resp: Produtos[])=>{
      this.listaProdutos = resp
    })
  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(filter:number){
    this.idCategoria = filter
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
    })
  }

}
