package com.ENatu.ENatu.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.ENatu.ENatu.model.Produtos;
import com.ENatu.ENatu.model.Usuario;
import com.ENatu.ENatu.model.Venda;
import com.ENatu.ENatu.repository.ProdutosRepository;
import com.ENatu.ENatu.repository.UsuarioRepository;
import com.ENatu.ENatu.repository.VendaRepository;

@Service
public class VendaServices {
	
	private @Autowired VendaRepository repository;
	private @Autowired UsuarioRepository repositoryU;
	private @Autowired ProdutosRepository repositoryP;
	
	public ResponseEntity<List<Venda>> pegarVendas(){
		List<Venda> listaDeVenda = repository.findAll();
		if(listaDeVenda.isEmpty()) {
			return ResponseEntity.status(204).build();
			
			}else {
				return ResponseEntity.status(200).body(listaDeVenda);
			}
	}
	
	public ResponseEntity<Venda> PegarIdVenda(@Valid @PathVariable long idVenda) {
		return repository.findById(idVenda)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	public ResponseEntity<Venda> novaVenda(long idProduto, long idUsuario, Venda novaVenda ) {
		Optional<Produtos> produtoExistente = repositoryP.findById(idProduto);
		Optional<Usuario> usuarioExistente = repositoryU.findById(idUsuario);
		
		if (produtoExistente.isPresent() && usuarioExistente.isPresent()) {
			novaVenda.setProdutos(produtoExistente.get());
			novaVenda.setUsuario(usuarioExistente.get());
			return ResponseEntity.status(201).body(repository.save(novaVenda));
		} else {
			return ResponseEntity.status(400).build();
		}
	}

	public ResponseEntity<Object> deletarVenda(Long idVenda) {
        Optional<Venda> VendaExistente = repository.findById(idVenda);

        if (VendaExistente.isEmpty()) {
            return ResponseEntity.status(400).build();
        } else {
            repository.deleteById(idVenda);
            return ResponseEntity.status(200).build();
        }
    }
}
