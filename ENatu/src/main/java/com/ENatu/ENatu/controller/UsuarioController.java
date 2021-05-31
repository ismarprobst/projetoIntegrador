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

import com.ENatu.ENatu.model.Usuario;
import com.ENatu.ENatu.repository.UsuarioRepository;



@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	
	@GetMapping("/nome")
	public ResponseEntity<List<Usuario>> pegarNomesUsuarios(){
		List<Usuario> listaDeNomes = repository.findAll();
		if(listaDeNomes.isEmpty()) {
			return ResponseEntity.status(204).build();
			
			}else {
				return ResponseEntity.status(200).body(listaDeNomes);
			}
	}
	
	@GetMapping("/{idUsuario}")
	public ResponseEntity<Usuario> GetById(@PathVariable long idUsuario) {
		return repository.findById(idUsuario)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	
	@PostMapping
	public ResponseEntity<Usuario> post (@RequestBody Usuario nomeUsuario){
		return ResponseEntity.status(201).body(repository.save(nomeUsuario));

	}
	@PutMapping
	public ResponseEntity<Usuario> put (@RequestBody Usuario nomeUsuario){
		return ResponseEntity.status(200).body(repository.save(nomeUsuario));

	}
	
	@DeleteMapping("/{idUsuario}")
	public void delete(@PathVariable long idUsuario) {
		repository.deleteById(idUsuario);
	}
}