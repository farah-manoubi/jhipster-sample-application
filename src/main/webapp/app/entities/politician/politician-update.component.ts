import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPolitician, Politician } from 'app/shared/model/politician.model';
import { PoliticianService } from './politician.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';

@Component({
  selector: 'jhi-politician-update',
  templateUrl: './politician-update.component.html',
})
export class PoliticianUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountry[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    age: [],
    popularity: [],
    country: [],
  });

  constructor(
    protected politicianService: PoliticianService,
    protected countryService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ politician }) => {
      this.updateForm(politician);

      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(politician: IPolitician): void {
    this.editForm.patchValue({
      id: politician.id,
      name: politician.name,
      age: politician.age,
      popularity: politician.popularity,
      country: politician.country,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const politician = this.createFromForm();
    if (politician.id !== undefined) {
      this.subscribeToSaveResponse(this.politicianService.update(politician));
    } else {
      this.subscribeToSaveResponse(this.politicianService.create(politician));
    }
  }

  private createFromForm(): IPolitician {
    return {
      ...new Politician(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      age: this.editForm.get(['age'])!.value,
      popularity: this.editForm.get(['popularity'])!.value,
      country: this.editForm.get(['country'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolitician>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICountry): any {
    return item.id;
  }
}
