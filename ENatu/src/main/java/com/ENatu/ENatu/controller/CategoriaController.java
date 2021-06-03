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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ENatu.ENatu.model.Categoria;
import com.ENatu.ENatu.repository.CategoriaRepository;


@RestController
@RequestMapping("/categoria")
public class CategoriaController {


	@Autowired
	private CategoriaRepository repositoryC;
	
	@GetMapping("/todasCategorias")
	public ResponseEntity<List<Categoria>> pegarTodasCategorias(){
		List<Categoria> listaDeTodasCategorias = repositoryC.findAll();
		if(listaDeTodasCategorias.isEmpty()) {
			return ResponseEntity.status(204).build();
			
			}else {
				return ResponseEntity.status(200).body(listaDeTodasCategorias);
			}
	}
	
	@GetMapping("/{idCategoria}")
	public ResponseEntity<Categoria> GetById(@Valid @PathVariable long idCategoria) {
		return repositoryC.findById(idCategoria)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/nomeCategoria")
	public ResponseEntity<Object> findByCategoria(@RequestParam(defaultValue = "") String nomeCategoria){
		
		List<Categoria> listaDeCategorias = repositoryC.findAllByNomeCategoriaContainingIgnoreCase(nomeCategoria);
		
		if(listaDeCategorias.isEmpty()) {
			
			return ResponseEntity.status(204).build();
		} else {
			
			return ResponseEntity.status(200).body(listaDeCategorias);
		}
	}
	
	
	@PostMapping("/salvar")
	public ResponseEntity<Categoria> post (@Valid @RequestBody Categoria nomeCategoria){
		return ResponseEntity.status(201).body(repositoryC.save(nomeCategoria));

	}
	@PutMapping("/atualizar")
	public ResponseEntity<Categoria> put (@Valid @RequestBody Categoria nomeCategoria){
		return ResponseEntity.status(200).body(repositoryC.save(nomeCategoria));

	}
	
	@DeleteMapping("/deletar/{idCategoria}")
	public void delete(@PathVariable long idCategoria) {
		repositoryC.deleteById(idCategoria);
	}
}
