import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PoliticianUpdateComponent } from 'app/entities/politician/politician-update.component';
import { PoliticianService } from 'app/entities/politician/politician.service';
import { Politician } from 'app/shared/model/politician.model';

describe('Component Tests', () => {
  describe('Politician Management Update Component', () => {
    let comp: PoliticianUpdateComponent;
    let fixture: ComponentFixture<PoliticianUpdateComponent>;
    let service: PoliticianService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PoliticianUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PoliticianUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PoliticianUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PoliticianService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Politician(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Politician();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
