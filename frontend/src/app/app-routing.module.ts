import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DeleteCategoriaComponent } from './delete/delete-categoria/delete-categoria.component';
import { DeleteProdutoComponent } from './delete/delete-produto/delete-produto.component';
import { EditCategoriaComponent } from './edit/edit-categoria/edit-categoria.component';
import { EditProdutoComponent } from './edit/edit-produto/edit-produto.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { QuemsomosComponent } from './quemsomos/quemsomos.component';
import { UsuarioProdutoComponent } from './usuario-produto/usuario-produto.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path:'entrar',component: EntrarComponent},
  {path: 'cadastrar', component: CadastroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin-produto', component: AdminProdutoComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path:'quem-somos',component: QuemsomosComponent},

  {path:'edit-categoria/:id',component: EditCategoriaComponent},
  {path:'delete-categoria/:id',component: DeleteCategoriaComponent},
  //Rotas para PUT e DELETE de produto
  {path:'edit-produto/:id',component: EditProdutoComponent},
  {path:'delete-produto/:id',component: DeleteProdutoComponent},
  {path: 'usuario-produto', component: UsuarioProdutoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
