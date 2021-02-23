import { ICountry } from 'app/shared/model/country.model';

export interface IPolitician {
  id?: number;
  name?: string;
  age?: string;
  popularity?: number;
  country?: ICountry;
}

export class Politician implements IPolitician {
  constructor(public id?: number, public name?: string, public age?: string, public popularity?: number, public country?: ICountry) {}
}
