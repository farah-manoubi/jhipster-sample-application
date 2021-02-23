import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPolitician } from 'app/shared/model/politician.model';
import { PoliticianService } from './politician.service';
import { PoliticianDeleteDialogComponent } from './politician-delete-dialog.component';

@Component({
  selector: 'jhi-politician',
  templateUrl: './politician.component.html',
})
export class PoliticianComponent implements OnInit, OnDestroy {
  politicians?: IPolitician[];
  eventSubscriber?: Subscription;

  constructor(protected politicianService: PoliticianService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.politicianService.query().subscribe((res: HttpResponse<IPolitician[]>) => (this.politicians = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPoliticians();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPolitician): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPoliticians(): void {
    this.eventSubscriber = this.eventManager.subscribe('politicianListModification', () => this.loadAll());
  }

  delete(politician: IPolitician): void {
    const modalRef = this.modalService.open(PoliticianDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.politician = politician;
  }
}
