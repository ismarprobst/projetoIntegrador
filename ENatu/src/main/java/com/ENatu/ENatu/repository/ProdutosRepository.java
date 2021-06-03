package com.ENatu.ENatu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ENatu.ENatu.model.Produtos;

@Repository
public interface ProdutosRepository extends JpaRepository<Produtos, Long> {

	List<Produtos> findAllByNomeProdutoContainingIgnoreCase (String nomeProduto);
}
