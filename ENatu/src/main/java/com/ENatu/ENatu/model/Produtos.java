package com.ENatu.ENatu.model;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table (name = "Produtos")
public class Produtos {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long idProduto;
private @NotNull (message ="Passar um valor aqui,não pode ser nulo.") String nomeProduto;
private @NotNull (message ="Passar um valor aqui,não pode ser nulo.") String descricao;
private @NotNull (message ="Passar um valor aqui,não pode ser nulo.") String marca;
private @NotNull (message ="Passar um valor aqui,não pode ser nulo.") double preco;

@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "fk_categoria")
@JsonIgnoreProperties("produtos")
private Categoria categoria;




public Categoria getCategoria() {
	return categoria;
}
public void setCategoria(Categoria categoria) {
	this.categoria = categoria;
}
public long getIdProduto() {
	return idProduto;
}
public void setIdProduto(long idProduto) {
	this.idProduto = idProduto;
}

public String getNomeProduto() {
	return nomeProduto;
}
public void setNomeProduto(String nomeProduto) {
	this.nomeProduto = nomeProduto;
}
public String getDescricao() {
	return descricao;
}
public void setDescricao(String descricao) {
	this.descricao = descricao;
}
public String getMarca() {
	return marca;
}
public void setMarca(String marca) {
	this.marca = marca;
}
public double getPreco() {
	return preco;
}
public void setPreco(double preco) {
	this.preco = preco;
}


}
