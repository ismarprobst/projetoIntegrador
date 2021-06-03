package com.ENatu.ENatu.controller;

import java.util.List;

import javax.validation.Valid;

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


import com.ENatu.ENatu.model.Venda;
import com.ENatu.ENatu.repository.VendaRepository;

@RestController
@RequestMapping("/pedido")
public class VendaController {

	@Autowired
	private VendaRepository repository;
	
	@GetMapping("/todosPedidos")
	public ResponseEntity<List<Venda>> pegarTodasVendas(){
		List<Venda> listaDeVenda = repository.findAll();
		if(listaDeVenda.isEmpty()) {
			return ResponseEntity.status(204).build();
			
			}else {
				return ResponseEntity.status(200).body(listaDeVenda);
			}
	}
	
	@GetMapping("/id/{idVenda}/")
	public ResponseEntity<Venda> GetById(@Valid @PathVariable long idVenda) {
		return repository.findById(idVenda)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	/* VER COM PROFESSOR COMO FAZER O POST DE UMA VENDA, COM QUAIS PARAMETROS ETC
	@PostMapping
	public ResponseEntity<Venda> post (@Valid @RequestBody Venda  ){
		return ResponseEntity.status(201).body(repository.save(nomeProduto));

	}
	@PutMapping
	public ResponseEntity<Venda> put (@Valid @RequestBody Venda nomeProduto){
		return ResponseEntity.status(200).body(repository.save(nomeProduto));

	} */
	
	@DeleteMapping("/deletarPedido/{idVenda}")
	public void delete(@PathVariable long idProduto) {
		repository.deleteById(idProduto);
	}
	
}
