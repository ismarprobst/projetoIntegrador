import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
/*import { QuemsomosComponent } from './quemsomos/quemsomos.component';*/

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path:'entrar',component: EntrarComponent},
  {path: 'cadastrar', component: CadastroComponent},
  {path: 'home', component: HomeComponent},

  /*{path:'quem-somos', component: QuemsomosComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
