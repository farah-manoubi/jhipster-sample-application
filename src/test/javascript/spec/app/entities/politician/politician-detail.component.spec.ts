import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PoliticianDetailComponent } from 'app/entities/politician/politician-detail.component';
import { Politician } from 'app/shared/model/politician.model';

describe('Component Tests', () => {
  describe('Politician Management Detail Component', () => {
    let comp: PoliticianDetailComponent;
    let fixture: ComponentFixture<PoliticianDetailComponent>;
    const route = ({ data: of({ politician: new Politician(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PoliticianDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PoliticianDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PoliticianDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load politician on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.politician).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
