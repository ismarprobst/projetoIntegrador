import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Venda } from '../model/Venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

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

  getByIdVenda(idVenda: number):Observable<Venda>{
    return this.http.get<Venda>(`http://localhost:8080/pedido/id/${idVenda}`,this.token)
  }

  getAllVenda():Observable<Venda[]>{
    return this.http.get<Venda[]>('http://localhost:8080/pedido/todos',this.token)
  }

  postVenda(idProduto: number, idUsuario: number,venda: Venda):Observable<Venda>{
    return this.http.post<Venda>(`http://localhost:8080/pedido/novo/usuario/${idUsuario}/produto/${idProduto}`,venda,this.token)

  }

  deleteVenda(idVenda: number){
    return this.http.delete(`http://localhost:8080/pedido/deletarPedido/${idVenda}`,this.token)

  }
}
