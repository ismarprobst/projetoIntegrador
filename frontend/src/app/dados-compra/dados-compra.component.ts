import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-dados-compra',
  templateUrl: './dados-compra.component.html',
  styleUrls: ['./dados-compra.component.css']
})
export class DadosCompraComponent implements OnInit {
  codigo: number
  quantidade: number = 1

  produto: Produtos = new Produtos()
  validaPagamento: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    public auth:AuthService
  

  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      alert('Você precisa estar logado para acessar essa página!')
      this.router.navigate(["/entrar"])
    }
    

    this.codigo = this.route.snapshot.params['id']

    this. getByIdProduto(this.codigo)

  }
  
  getByIdProduto(id: number){
    this.produtosService. getByIdProduto(id).subscribe((resp: Produtos) => {
      this.produto = resp

    })
  }

  acrescentar(){
    this.quantidade += 1
  }

  retirar(){
    if(this.quantidade == 1){
      alert('Não é possível zerar o carrinho!')
    }else{
      this.quantidade -= 1
    }
  }



  validarPagamento(pagamento: string){
    console.log(pagamento)
  }

  comprar(){
    this.router.navigate(["/home"])

  }

  finalizarVenda(){

    if(this.validaPagamento == "cartao"){
      alert("Dados enviados para processamento! Em breve você reberá um email ;)")
      this.router.navigate(['/home'])
     
    }else if(this.validaPagamento == "boleto"){
      alert("Em breve você reberá o boleto no seu um email!")
      this.router.navigate(['/home'])
     
    }else{
      alert("Selecione uma opção de pagamento!")
    }

  }

  
  

}
