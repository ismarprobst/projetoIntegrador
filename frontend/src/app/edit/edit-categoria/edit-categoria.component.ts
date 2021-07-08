import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit {
categoria: Categoria = new Categoria()
idCategoria:number

  constructor(
    
    private router:Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
    
    ) { }

  ngOnInit(){
    if (environment.token == "") {
      this.router.navigate(["/entrar"])
    }
    
    this.idCategoria = this.route.snapshot.params["id"]
    this.findByIdCategoria(this.idCategoria)
  }
  
  findByIdCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria=resp
    })

  }
  atualizar(){
    this.categoriaService.putCategoria(this.idCategoria, this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      alert('Categoria atualizada')
      this.router.navigate(['/categorias'])
    })

  }
}
