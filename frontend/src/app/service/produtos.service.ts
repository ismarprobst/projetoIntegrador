import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

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

  // Métodos GET
  getAllProduto():Observable<Produtos[]>{
    return this.http.get<Produtos[]>('http://localhost:8080/produto/todos',this.token)
  }

  getByIdProduto(idProduto: number):Observable<Produtos>{
    return this.http.get<Produtos>(`http://localhost:8080/produto/id/${idProduto}`, this.token)
  }

  getByNomeProduto(nomeProduto: string):Observable<Produtos[]>{
    let params = new HttpParams().set('nomeProduto',nomeProduto)
    return this.http.get<Produtos[]>(`http://localhost:8080/produto/nome?${params}`,this.token)
  }


  // Método POST
  postProduto(produto: Produtos):Observable<Produtos>{
    return this.http.post<Produtos>('http://localhost:8080/produto/salvar',produto,this.token)
  }

  // Método PUT
  putProduto(idProduto:number,produto:Produtos):Observable<Produtos>{
    return this.http.put<Produtos>(`http://localhost:8080/produto/atualizar/${idProduto}`,produto,this.token)
  }

  // Método DELETE
  
  deleteProduto(idProduto:number){
    return this.http.delete(`http://localhost:8080/produto/deletar/${idProduto}`,this.token)
  }




}
