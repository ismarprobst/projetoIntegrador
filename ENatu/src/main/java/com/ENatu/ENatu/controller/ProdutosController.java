package com.ENatu.ENatu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ENatu.ENatu.model.Produtos;
import com.ENatu.ENatu.repository.ProdutosRepository;



@RestController
@RequestMapping("/produto")
public class ProdutosController {

		@Autowired
		private ProdutosRepository repositoryP;
		
		@GetMapping("/listaProdutos")
		public ResponseEntity<List<Produtos>> pegarTodosProdutos(){
			List<Produtos> listaDeProdutos = repositoryP.findAll();
			if(listaDeProdutos.isEmpty()) {
				return ResponseEntity.status(204).build();
				
				}else {
					return ResponseEntity.status(200).body(listaDeProdutos);
				}
		}
		
		@GetMapping("/{idProduto}")
		public ResponseEntity<Produtos> GetById(@PathVariable long idProduto) {
			return repositoryP.findById(idProduto)
					.map(resp -> ResponseEntity.ok(resp))
					.orElse(ResponseEntity.notFound().build());
		}
		
		
		@PostMapping
		public ResponseEntity<Produtos> post (@RequestBody Produtos nomeProduto){
			return ResponseEntity.status(201).body(repositoryP.save(nomeProduto));

		}
		@PutMapping
		public ResponseEntity<Produtos> put (@RequestBody Produtos nomeProduto){
			return ResponseEntity.status(200).body(repositoryP.save(nomeProduto));

		}
		
		@DeleteMapping("/{idProduto}")
		public void delete(@PathVariable long idProduto) {
			repositoryP.deleteById(idProduto);
		}
	}

