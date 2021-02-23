package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Politician;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Politician entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoliticianRepository extends JpaRepository<Politician, Long> {
}
