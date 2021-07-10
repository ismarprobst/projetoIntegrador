import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produtos } from 'src/app/model/Produtos';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.css']
})
export class EditProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  idProduto: number

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    if (environment.token == "") {
      this.router.navigate(["/entrar"])
    }
    this.idProduto = this.route.snapshot.params["id"]
    this.findByIdProduto(this.idProduto)
    this.findAllCategorias()
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=> {
      this.categoria = resp
    })

  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    }    )
  }

  findByIdProduto(id:number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos)=>{
      this.produto=resp
    })
  }

  atualizar(){
    this.produtosService.putProduto(this.idProduto, this.produto).subscribe((resp: Produtos)=>{
      this.produto = resp
      alert('Produto atualizado')
      this.router.navigate(['/admin-produto'])
    })
  }

}
