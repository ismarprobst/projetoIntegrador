import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit(): void {
  }
  validacaoNome() {
    let teste = document.querySelector('#nome') as HTMLInputElement
    if (teste.value.length > 5) {
      return true
    } else {
      return false
    }
  }

  validacaoEmail() {
    let teste2 = document.querySelector('#email') as HTMLInputElement
    if (teste2.value.indexOf('@') == -1 || teste2.value.indexOf('.') == -1) {
      return false
    } else {
      return true
    }
  }

  enviar() {
    if (this.validacaoNome() && this.validacaoEmail()) {
      this.alertas.showAlertSuccess('Enviado com sucesso!')
    } else {
      this.alertas.showAlertDanger('Tente novamente!')
    }
  }

}





