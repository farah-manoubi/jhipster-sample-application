package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class PoliticianTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Politician.class);
        Politician politician1 = new Politician();
        politician1.setId(1L);
        Politician politician2 = new Politician();
        politician2.setId(politician1.getId());
        assertThat(politician1).isEqualTo(politician2);
        politician2.setId(2L);
        assertThat(politician1).isNotEqualTo(politician2);
        politician1.setId(null);
        assertThat(politician1).isNotEqualTo(politician2);
    }
}
