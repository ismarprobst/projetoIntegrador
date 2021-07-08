import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditCategoriaComponent } from '../edit/edit-categoria/edit-categoria.component';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>('http://localhost:8080/categoria/todas',this.token)
  }
  // Método POST
  postCategoria(categoria: Categoria):Observable<Categoria>{
    return this.http.post<Categoria>('http://localhost:8080/categoria/salvar',categoria,this.token)
  }
  putCategoria(idCategoria:number,categoria:Categoria):Observable<Categoria>{
    return this.http.put<Categoria>(`http://localhost:8080/categoria/atualizar/${idCategoria}`,categoria,this.token)
  }
  getByIdCategoria(idCategoria:number):Observable<Categoria>{
    return this.http.get<Categoria>(`http://localhost:8080/categoria/id/${idCategoria}`,this.token)

  }

  deleteCategoria(idCategoria:number){
    return this.http.delete(`http://localhost:8080/categoria/deletar/${idCategoria}`,this.token)
  }
}
