import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPolitician } from 'app/shared/model/politician.model';

@Component({
  selector: 'jhi-politician-detail',
  templateUrl: './politician-detail.component.html',
})
export class PoliticianDetailComponent implements OnInit {
  politician: IPolitician | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ politician }) => (this.politician = politician));
  }

  previousState(): void {
    window.history.back();
  }
}
