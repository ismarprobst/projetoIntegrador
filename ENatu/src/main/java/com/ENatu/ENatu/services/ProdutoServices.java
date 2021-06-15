package com.ENatu.ENatu.services;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ENatu.ENatu.model.Produtos;
import com.ENatu.ENatu.repository.ProdutosRepository;


@Service
public class ProdutoServices {
	
	private @Autowired ProdutosRepository repository;
	
	public ResponseEntity<List<Produtos>> pegarTodos() {
		List<Produtos> listaDeProdutos = repository.findAll();
		if (listaDeProdutos.isEmpty()) {
			return ResponseEntity.status(204).build();

		} else {
			return ResponseEntity.status(200).body(listaDeProdutos);
		}
	}
	
	public ResponseEntity<Produtos> pegarPorId(long idProduto) {
		return repository.findById(idProduto).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	public ResponseEntity<List<Produtos>> pegarNomeProduto(String nomeProduto) {

		List<Produtos> listaDeProdutos = repository.findAllByNomeProdutoContainingIgnoreCase(nomeProduto);

		if (listaDeProdutos.isEmpty()) {

			return ResponseEntity.status(204).build();
		} else {

			return ResponseEntity.status(200).body(listaDeProdutos);
		}
	}
	
	
	public ResponseEntity <Object> salvarProduto(Produtos novoProduto){
		Optional<Produtos> produtoExistente = repository.findByNomeProduto(novoProduto.getNomeProduto());
		
		if(produtoExistente.isPresent()) {
			return ResponseEntity.status(406).body("já cadastrado");
		}else {
			return ResponseEntity.status(201).body(repository.save(novoProduto)); 
		}		
	}
	
	public ResponseEntity<Produtos> atualizarProduto(Long idProduto, Produtos alterProduto) {
		Optional<Produtos> idProdutoExiste = repository.findById(idProduto);
		

		if (idProdutoExiste.isPresent()) {

			idProdutoExiste.get().setNomeProduto(alterProduto.getNomeProduto());
			idProdutoExiste.get().setDescricao(alterProduto.getDescricao());
			idProdutoExiste.get().setMarca(alterProduto.getMarca());
			idProdutoExiste.get().setPreco(alterProduto.getPreco());
			idProdutoExiste.get().setCategoria(alterProduto.getCategoria());
			return ResponseEntity.status(202).body(repository.save(idProdutoExiste.get()));

		} else {
			return ResponseEntity.status(405).build();
		}
	}
	
	public ResponseEntity<Object> deletarProduto(Long idProduto) {
        Optional<Produtos> idProdutoExiste = repository.findById(idProduto);

        if (idProdutoExiste.isEmpty()) {
            return ResponseEntity.status(400).build();
        } else {
            repository.deleteById(idProduto);
            return ResponseEntity.status(200).build();
        }
    }
	
}
