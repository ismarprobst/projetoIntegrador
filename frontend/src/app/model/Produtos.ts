import { categoria } from "./Categoria"
import { Venda } from "./Venda"

export class Produtos{
    public idProduto: number
    public nomeProduto: string
    public descricao: string
    public marca : string
    public preco: number
    public categoria: categoria
    public produtosVendidos: Venda[]
}