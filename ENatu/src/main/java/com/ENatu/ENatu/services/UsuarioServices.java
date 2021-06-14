package com.ENatu.ENatu.services;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ENatu.ENatu.model.UserLogin;
import com.ENatu.ENatu.model.Usuario;
import com.ENatu.ENatu.repository.UsuarioRepository;

@Service
public class UsuarioServices {

	private @Autowired UsuarioRepository repository;

	public ResponseEntity<List<Usuario>> pegarTodos() {
		List<Usuario> listaDeNomes = repository.findAll();
		if (listaDeNomes.isEmpty()) {
			return ResponseEntity.status(204).build();

		} else {
			return ResponseEntity.status(200).body(listaDeNomes);
		}
	}

	public ResponseEntity<Usuario> pegarPorId(long idUsuario) {
		return repository.findById(idUsuario).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}

	public ResponseEntity<List<Usuario>> pegarNomeUsuario(String nome) {

		List<Usuario> listaDeNomes = repository.findAllByNomeContainingIgnoreCase(nome);

		if (listaDeNomes.isEmpty()) {

			return ResponseEntity.status(204).build();
		} else {

			return ResponseEntity.status(200).body(listaDeNomes);
		}
	}

	public ResponseEntity<Usuario> cadastrarUsuario(Usuario novoUsuario) {
		Optional<Usuario> usuarioExistente = repository.findByEmail(novoUsuario.getEmail());

		if (usuarioExistente.isPresent()) {
			return ResponseEntity.status(406).build();
		} else {

			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

			String senhaEncoder = encoder.encode(novoUsuario.getSenha());
			novoUsuario.setSenha(senhaEncoder);

			return ResponseEntity.ok(repository.save(novoUsuario));

		}
	}

	public ResponseEntity<Usuario> atualizarUsuario(Long idUsuario, Usuario alterUsuario) {
		Optional<Usuario> idUsuarioExiste = repository.findById(idUsuario);
		Optional<Usuario> emailUsuarioExiste = repository.findByEmail(alterUsuario.getEmail());

		if (idUsuarioExiste.isPresent() && emailUsuarioExiste.isEmpty()) {

			idUsuarioExiste.get().setNome(alterUsuario.getNome());
			idUsuarioExiste.get().setSenha(alterUsuario.getSenha());
			/* idUsuarioExiste.get().setEmail(alterUsuario.getEmail()); */
			return ResponseEntity.status(202).body(repository.save(idUsuarioExiste.get()));

		} else {
			return ResponseEntity.status(405).build();
		}
	}

	public ResponseEntity<Object> deletarUsuario(Long idUsuario) {
		Optional<Usuario> idUsuarioExistente = repository.findById(idUsuario);

		if (idUsuarioExistente.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			repository.deleteById(idUsuario);
			return ResponseEntity.status(200).build();
		}
	}

	public ResponseEntity<Optional<UserLogin>>logar(Optional<UserLogin> user) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByEmail(user.get().getEmail());

		if (usuario.isPresent()) {
			if (encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodedAuth);

				user.get().setToken(authHeader);
				user.get().setNome(usuario.get().getNome());

				return ResponseEntity.status(HttpStatus.OK).body(user);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();

		}
	}
	
}