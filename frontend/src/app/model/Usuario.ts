import { Venda } from "./Venda"

export class Usuario{
    public idUsuario:number
    public nome: string
    public email: string
    public senha: string
    public minhasCompras :Venda[]
}