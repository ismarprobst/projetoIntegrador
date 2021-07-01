import { Produtos } from "./Produtos"

export class categoria {
    public idCategoria: number
    public nomeCategoria:string
    public autorizado: boolean
    public descricaoCategoria: string
    public produtosDaCategoria: Produtos
}