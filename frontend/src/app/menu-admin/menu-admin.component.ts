import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {


  nome = environment.nome

  constructor(private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
  }

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0
  }

}
