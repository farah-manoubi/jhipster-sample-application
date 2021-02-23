package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Politician;
import com.mycompany.myapp.repository.PoliticianRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PoliticianResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PoliticianResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_AGE = "AAAAAAAAAA";
    private static final String UPDATED_AGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_POPULARITY = 1;
    private static final Integer UPDATED_POPULARITY = 2;

    @Autowired
    private PoliticianRepository politicianRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPoliticianMockMvc;

    private Politician politician;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Politician createEntity(EntityManager em) {
        Politician politician = new Politician()
            .name(DEFAULT_NAME)
            .age(DEFAULT_AGE)
            .popularity(DEFAULT_POPULARITY);
        return politician;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Politician createUpdatedEntity(EntityManager em) {
        Politician politician = new Politician()
            .name(UPDATED_NAME)
            .age(UPDATED_AGE)
            .popularity(UPDATED_POPULARITY);
        return politician;
    }

    @BeforeEach
    public void initTest() {
        politician = createEntity(em);
    }

    @Test
    @Transactional
    public void createPolitician() throws Exception {
        int databaseSizeBeforeCreate = politicianRepository.findAll().size();
        // Create the Politician
        restPoliticianMockMvc.perform(post("/api/politicians")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(politician)))
            .andExpect(status().isCreated());

        // Validate the Politician in the database
        List<Politician> politicianList = politicianRepository.findAll();
        assertThat(politicianList).hasSize(databaseSizeBeforeCreate + 1);
        Politician testPolitician = politicianList.get(politicianList.size() - 1);
        assertThat(testPolitician.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPolitician.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testPolitician.getPopularity()).isEqualTo(DEFAULT_POPULARITY);
    }

    @Test
    @Transactional
    public void createPoliticianWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = politicianRepository.findAll().size();

        // Create the Politician with an existing ID
        politician.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoliticianMockMvc.perform(post("/api/politicians")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(politician)))
            .andExpect(status().isBadRequest());

        // Validate the Politician in the database
        List<Politician> politicianList = politicianRepository.findAll();
        assertThat(politicianList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPoliticians() throws Exception {
        // Initialize the database
        politicianRepository.saveAndFlush(politician);

        // Get all the politicianList
        restPoliticianMockMvc.perform(get("/api/politicians?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(politician.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].popularity").value(hasItem(DEFAULT_POPULARITY)));
    }
    
    @Test
    @Transactional
    public void getPolitician() throws Exception {
        // Initialize the database
        politicianRepository.saveAndFlush(politician);

        // Get the politician
        restPoliticianMockMvc.perform(get("/api/politicians/{id}", politician.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(politician.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.popularity").value(DEFAULT_POPULARITY));
    }
    @Test
    @Transactional
    public void getNonExistingPolitician() throws Exception {
        // Get the politician
        restPoliticianMockMvc.perform(get("/api/politicians/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePolitician() throws Exception {
        // Initialize the database
        politicianRepository.saveAndFlush(politician);

        int databaseSizeBeforeUpdate = politicianRepository.findAll().size();

        // Update the politician
        Politician updatedPolitician = politicianRepository.findById(politician.getId()).get();
        // Disconnect from session so that the updates on updatedPolitician are not directly saved in db
        em.detach(updatedPolitician);
        updatedPolitician
            .name(UPDATED_NAME)
            .age(UPDATED_AGE)
            .popularity(UPDATED_POPULARITY);

        restPoliticianMockMvc.perform(put("/api/politicians")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPolitician)))
            .andExpect(status().isOk());

        // Validate the Politician in the database
        List<Politician> politicianList = politicianRepository.findAll();
        assertThat(politicianList).hasSize(databaseSizeBeforeUpdate);
        Politician testPolitician = politicianList.get(politicianList.size() - 1);
        assertThat(testPolitician.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPolitician.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testPolitician.getPopularity()).isEqualTo(UPDATED_POPULARITY);
    }

    @Test
    @Transactional
    public void updateNonExistingPolitician() throws Exception {
        int databaseSizeBeforeUpdate = politicianRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPoliticianMockMvc.perform(put("/api/politicians")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(politician)))
            .andExpect(status().isBadRequest());

        // Validate the Politician in the database
        List<Politician> politicianList = politicianRepository.findAll();
        assertThat(politicianList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePolitician() throws Exception {
        // Initialize the database
        politicianRepository.saveAndFlush(politician);

        int databaseSizeBeforeDelete = politicianRepository.findAll().size();

        // Delete the politician
        restPoliticianMockMvc.perform(delete("/api/politicians/{id}", politician.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Politician> politicianList = politicianRepository.findAll();
        assertThat(politicianList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
