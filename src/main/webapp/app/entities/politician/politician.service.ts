import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPolitician } from 'app/shared/model/politician.model';

type EntityResponseType = HttpResponse<IPolitician>;
type EntityArrayResponseType = HttpResponse<IPolitician[]>;

@Injectable({ providedIn: 'root' })
export class PoliticianService {
  public resourceUrl = SERVER_API_URL + 'api/politicians';

  constructor(protected http: HttpClient) {}

  create(politician: IPolitician): Observable<EntityResponseType> {
    return this.http.post<IPolitician>(this.resourceUrl, politician, { observe: 'response' });
  }

  update(politician: IPolitician): Observable<EntityResponseType> {
    return this.http.put<IPolitician>(this.resourceUrl, politician, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPolitician>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPolitician[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
