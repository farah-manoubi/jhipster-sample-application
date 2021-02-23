import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PoliticianComponent } from 'app/entities/politician/politician.component';
import { PoliticianService } from 'app/entities/politician/politician.service';
import { Politician } from 'app/shared/model/politician.model';

describe('Component Tests', () => {
  describe('Politician Management Component', () => {
    let comp: PoliticianComponent;
    let fixture: ComponentFixture<PoliticianComponent>;
    let service: PoliticianService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PoliticianComponent],
      })
        .overrideTemplate(PoliticianComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PoliticianComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PoliticianService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Politician(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.politicians && comp.politicians[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
