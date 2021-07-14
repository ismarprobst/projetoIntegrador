import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { AlertasService } from '../service/alertas.service';
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
  validaDoador: string

  doador: string


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    public auth: AuthService,
    private alertas: AlertasService


  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.alertas.showAlertDanger('Você precisa estar logado para acessar essa página!')
      this.router.navigate(["/entrar"])
    }


    this.codigo = this.route.snapshot.params['id']

    this.getByIdProduto(this.codigo)

  }

  getByIdProduto(id: number) {
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos) => {
      this.produto = resp

    })
  }

  acrescentar() {
    this.quantidade += 1
  }

  retirar() {
    if (this.quantidade == 1) {
      this.alertas.showAlertDanger('Não é possível zerar o carrinho!')
    } else {
      this.quantidade -= 1
    }
  }

  validarPagamento(pagamento: string) {
    console.log(pagamento)
  }

  validarDoador(doador: string) {
    console.log(doador)
  }

  comprar() {
    this.router.navigate(["/home"])

  }

  desconto() {
    this.produto.preco = 0.90 * (this.produto.preco * this.quantidade)
  }

  finalizarVenda() {

    if (this.validaPagamento == "cartao") {

      if (this.validaDoador == "sim") {
        this.desconto()
        this.alertas.showAlertSuccess("Você ganhou um desconto de 10%! O valor final ficará R$" + (this.produto.preco).toFixed(2) + "  -   " + "Dados enviados para processamento! Em breve você receberá um email !")

        this.router.navigate(['/home'])
      } else if (this.validaDoador == "nao") {
        this.alertas.showAlertSuccess("Que pena! Doe sangue e ganhe desconto de 10% em nossos produtos." + "  -   " + "Dados enviados para processamento! Em breve você receberá um email !")
        this.router.navigate(['/home'])

      } else {
        this.alertas.showAlertDanger("Por favor, escolha uma opção")
      }

    } else if (this.validaPagamento == "boleto") {

      if (this.validaDoador == "sim") {
        this.desconto()
        this.alertas.showAlertSuccess("Você ganhou um desconto de 10%! O valor final ficará R$" + (this.produto.preco).toFixed(2) + "  -   " + "Em breve você reberá o boleto no seu email!")
        this.router.navigate(['/home'])
      } else if (this.validaDoador == "nao") {
        this.alertas.showAlertDanger("Que pena! Doe sangue e ganhe desconto de 10% em nossos produtos." + "  -   " + "Em breve você reberá o boleto no seu um email!")
        this.router.navigate(['/home'])
      } else {
        this.alertas.showAlertDanger("Por favor, escolha uma opção")
      }

    } else {
      this.alertas.showAlertDanger("Selecione uma opção de pagamento!")
    }

  }


  finalizarDoacao() {
    if (this.validaPagamento == "cartao") {

      if (this.validaDoador == "sim") {
        this.desconto()
        this.alertas.showAlertSuccess("Voce ganhou um desconto de 10%! O valor final ficará R$" + (this.produto.preco).toFixed(2) + "  -   " + "Obrigado pela doação! Dados enviados para processamento. Em breve você receberá um email")
        this.router.navigate(['/home'])
      } else if (this.validaDoador == "nao") {
        this.alertas.showAlertDanger("Que pena! Doe sangue e ganhe desconto de 10% em nossos produtos.")
        this.alertas.showAlertInfo("Obrigado pela doação! Dados enviados para processamento. Em breve você receberá um email")
        this.router.navigate(['/home'])

      } else {
        this.alertas.showAlertDanger("Por favor, escolha uma opção")
      }

    } else if (this.validaPagamento == "boleto") {

      if (this.validaDoador == "sim") {
        this.desconto()
        this.alertas.showAlertInfo("Você ganhou um desconto de 10%! O valor final ficará R$" + (this.produto.preco).toFixed(2) + "  -   " + "Obrigado pela doação! Em breve você receberá o boleto no seu um email!")
        this.router.navigate(['/home'])
      } else if (this.validaDoador == "nao") {
        this.alertas.showAlertDanger("Que pena! Doe sangue e ganhe desconto de 10% em nossos produtos." + "  -   " + "Obrigado pela doação! Em breve você receberá o boleto no seu email!")
        this.router.navigate(['/home'])
      } else {
        this.alertas.showAlertDanger("Por favor, escolha uma opção")
      }

    } else {
      this.alertas.showAlertDanger("Selecione uma opção de pagamento!")
    }
  }

}
