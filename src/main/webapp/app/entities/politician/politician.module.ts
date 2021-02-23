import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PoliticianComponent } from './politician.component';
import { PoliticianDetailComponent } from './politician-detail.component';
import { PoliticianUpdateComponent } from './politician-update.component';
import { PoliticianDeleteDialogComponent } from './politician-delete-dialog.component';
import { politicianRoute } from './politician.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(politicianRoute)],
  declarations: [PoliticianComponent, PoliticianDetailComponent, PoliticianUpdateComponent, PoliticianDeleteDialogComponent],
  entryComponents: [PoliticianDeleteDialogComponent],
})
export class JhipsterSampleApplicationPoliticianModule {}
