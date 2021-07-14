import { Produtos } from "./Produtos"

export class Categoria {
    public idCategoria: number
    public nomeCategoria:string
    public autorizado: boolean
    public descricao: string
    public produtosDaCategoria: Produtos[]
}