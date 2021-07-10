import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { QuemsomosComponent } from './quemsomos/quemsomos.component';
import { Menu2Component } from './menu2/menu2.component';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { EditCategoriaComponent } from './edit/edit-categoria/edit-categoria.component';
import { DeleteCategoriaComponent } from './delete/delete-categoria/delete-categoria.component';
import { EditProdutoComponent } from './edit/edit-produto/edit-produto.component';
import { DeleteProdutoComponent } from './delete/delete-produto/delete-produto.component';
import { UsuarioProdutoComponent } from './usuario-produto/usuario-produto.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    CadastroComponent,
    EntrarComponent,
    HomeComponent,
    ContatoComponent,
    QuemsomosComponent,
    Menu2Component,
    AdminProdutoComponent,
    CategoriasComponent,
    MenuAdminComponent,
    EditCategoriaComponent,
    DeleteCategoriaComponent,

    EditProdutoComponent,
    DeleteProdutoComponent,

    UsuarioProdutoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
