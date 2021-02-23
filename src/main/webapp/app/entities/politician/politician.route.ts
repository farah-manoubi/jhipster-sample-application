import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPolitician, Politician } from 'app/shared/model/politician.model';
import { PoliticianService } from './politician.service';
import { PoliticianComponent } from './politician.component';
import { PoliticianDetailComponent } from './politician-detail.component';
import { PoliticianUpdateComponent } from './politician-update.component';

@Injectable({ providedIn: 'root' })
export class PoliticianResolve implements Resolve<IPolitician> {
  constructor(private service: PoliticianService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPolitician> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((politician: HttpResponse<Politician>) => {
          if (politician.body) {
            return of(politician.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Politician());
  }
}

export const politicianRoute: Routes = [
  {
    path: '',
    component: PoliticianComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.politician.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PoliticianDetailComponent,
    resolve: {
      politician: PoliticianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.politician.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PoliticianUpdateComponent,
    resolve: {
      politician: PoliticianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.politician.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PoliticianUpdateComponent,
    resolve: {
      politician: PoliticianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.politician.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
