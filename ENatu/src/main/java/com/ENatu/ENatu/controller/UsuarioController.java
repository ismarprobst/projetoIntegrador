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

import com.ENatu.ENatu.model.Usuario;
import com.ENatu.ENatu.repository.UsuarioRepository;



@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	
	@GetMapping("/todosUsuarios")
	public ResponseEntity<List<Usuario>> pegarUsuarios(){
		List<Usuario> listaDeNomes = repository.findAll();
		if(listaDeNomes.isEmpty()) {
			return ResponseEntity.status(204).build();
			
			}else {
				return ResponseEntity.status(200).body(listaDeNomes);
			}
	}
	
	@GetMapping("/id/{idUsuario}")
	public ResponseEntity<Usuario> GetById(@Valid @PathVariable long idUsuario) {
		return repository.findById(idUsuario)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/nome")
	public ResponseEntity<Object> findByNome(@RequestParam(defaultValue = "") String nome){
		
		List<Usuario> listaDeNomes = repository.findAllByNomeContainingIgnoreCase(nome);
		
		if(listaDeNomes.isEmpty()) {
			
			return ResponseEntity.status(204).build();
		} else {
			
			return ResponseEntity.status(200).body(listaDeNomes);
		}
	}
	
	
	@PostMapping("/salvar")
	public ResponseEntity<Usuario> post (@Valid @RequestBody Usuario nomeUsuario){
		return ResponseEntity.status(201).body(repository.save(nomeUsuario));

	}
	@PutMapping("/alterar")
	public ResponseEntity<Usuario> put (@Valid @RequestBody Usuario nomeUsuario){
		return ResponseEntity.status(200).body(repository.save(nomeUsuario));

	}
	
	@DeleteMapping("/deletar/{idUsuario}")
	public void delete(@PathVariable long idUsuario) {
		repository.deleteById(idUsuario);
	}
}