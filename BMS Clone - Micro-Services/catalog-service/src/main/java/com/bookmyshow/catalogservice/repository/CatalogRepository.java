package com.bookmyshow.catalogservice.repository;

import com.bookmyshow.catalogservice.entity.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, String> {

}