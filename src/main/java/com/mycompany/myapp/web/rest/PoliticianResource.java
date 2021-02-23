package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Politician;
import com.mycompany.myapp.repository.PoliticianRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Politician}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PoliticianResource {

    private final Logger log = LoggerFactory.getLogger(PoliticianResource.class);

    private static final String ENTITY_NAME = "politician";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PoliticianRepository politicianRepository;

    public PoliticianResource(PoliticianRepository politicianRepository) {
        this.politicianRepository = politicianRepository;
    }

    /**
     * {@code POST  /politicians} : Create a new politician.
     *
     * @param politician the politician to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new politician, or with status {@code 400 (Bad Request)} if the politician has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/politicians")
    public ResponseEntity<Politician> createPolitician(@RequestBody Politician politician) throws URISyntaxException {
        log.debug("REST request to save Politician : {}", politician);
        if (politician.getId() != null) {
            throw new BadRequestAlertException("A new politician cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Politician result = politicianRepository.save(politician);
        return ResponseEntity.created(new URI("/api/politicians/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /politicians} : Updates an existing politician.
     *
     * @param politician the politician to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated politician,
     * or with status {@code 400 (Bad Request)} if the politician is not valid,
     * or with status {@code 500 (Internal Server Error)} if the politician couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/politicians")
    public ResponseEntity<Politician> updatePolitician(@RequestBody Politician politician) throws URISyntaxException {
        log.debug("REST request to update Politician : {}", politician);
        if (politician.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Politician result = politicianRepository.save(politician);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, politician.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /politicians} : get all the politicians.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of politicians in body.
     */
    @GetMapping("/politicians")
    public List<Politician> getAllPoliticians() {
        log.debug("REST request to get all Politicians");
        return politicianRepository.findAll();
    }

    /**
     * {@code GET  /politicians/:id} : get the "id" politician.
     *
     * @param id the id of the politician to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the politician, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/politicians/{id}")
    public ResponseEntity<Politician> getPolitician(@PathVariable Long id) {
        log.debug("REST request to get Politician : {}", id);
        Optional<Politician> politician = politicianRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(politician);
    }

    /**
     * {@code DELETE  /politicians/:id} : delete the "id" politician.
     *
     * @param id the id of the politician to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/politicians/{id}")
    public ResponseEntity<Void> deletePolitician(@PathVariable Long id) {
        log.debug("REST request to delete Politician : {}", id);
        politicianRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
