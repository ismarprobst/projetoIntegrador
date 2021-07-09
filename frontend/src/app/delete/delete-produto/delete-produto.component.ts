import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/model/Produtos';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delete-produto',
  templateUrl: './delete-produto.component.html',
  styleUrls: ['./delete-produto.component.css']
})
export class DeleteProdutoComponent implements OnInit {

  produto: Produtos = new Produtos()
  idProduto: number

  constructor(
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if(environment.token ==''){
      this.router.navigate(['/entrar'])
    }
    this.idProduto = this.route. snapshot.params['id']
    this.findByIdProduto(this.idProduto)
  }

  findByIdProduto(id:number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos)=>{
      this.produto=resp
    })

  }

  apagar(){
    this.produtosService.deleteProduto(this.idProduto).subscribe(()=>{
     alert('Produto apagado com sucesso') 
     this.router.navigate(['/admin-produto'])
    })
  }

}
