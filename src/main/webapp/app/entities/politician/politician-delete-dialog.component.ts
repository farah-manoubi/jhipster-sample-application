import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolitician } from 'app/shared/model/politician.model';
import { PoliticianService } from './politician.service';

@Component({
  templateUrl: './politician-delete-dialog.component.html',
})
export class PoliticianDeleteDialogComponent {
  politician?: IPolitician;

  constructor(
    protected politicianService: PoliticianService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.politicianService.delete(id).subscribe(() => {
      this.eventManager.broadcast('politicianListModification');
      this.activeModal.close();
    });
  }
}
