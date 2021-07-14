 import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-quemsomos',
  templateUrl: './quemsomos.component.html',
  styleUrls: ['./quemsomos.component.css']
})
export class QuemsomosComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }


  ngOnInit(): void {
  }
  validacaoNome(){
    let teste = document.querySelector('#nome') as HTMLInputElement
    if(teste.value.length > 5){
      return true
    }else{
      return false
    }
  }

  validacaoEmail(){
    let teste = document.querySelector('#email') as HTMLInputElement
    if(teste.value.indexOf('@') == -1 || teste.value.indexOf('.') == -1){
      return true
    }else{
      return false
    }
  }

  enviar(){
    if (this.validacaoNome() && this.validacaoEmail()){
      alert('Enviado com sucesso!')
    }else{
      alert('Tente novamente!')
    }
  }


}
