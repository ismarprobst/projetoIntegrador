import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]

  constructor(public auth: AuthService, 
    private router: Router, 
    private categoriaService: CategoriaService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {
    if (environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    if (environment.nome != "admin"){
      this.alertas.showAlertDanger("Você precisa ser administrador para acesar essa rota")
      this.router.navigate(['/home'])
    }

    this.categoriaService.refreshToken()

    this.findAllCategorias()

    
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  cadastrarCategoria(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.alertas.showAlertSuccess("Categoria cadastrada com sucesso")
      this.findAllCategorias()
      this.categoria = new Categoria()
    })



}
}
