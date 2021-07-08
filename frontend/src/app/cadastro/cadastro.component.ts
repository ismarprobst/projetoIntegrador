import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario: Usuario = new Usuario
  confirmarSenha: string


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  cadastrar() {
    if (this.usuario.nome.length < 3){
      alert('Nome deve conter pelo menos 3 dígitos')
    }

    if (this.usuario.email.length < 5){
      alert('E-mail deve conter 5 dígitos')
    }
    
    if(this.usuario.senha.length < 6){
      alert('Senha deve conter pelo menos 6 dígitos')
    }
    
    if (this.usuario.senha != this.confirmarSenha) {
      alert("As senhas estão inccorretas.")
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(["/entrar"])
        alert("Usuário cadastrado com sucesso.")
      })
    }

  }

}
