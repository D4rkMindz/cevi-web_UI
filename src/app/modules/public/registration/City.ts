export class City {

  get id(): number {
    return this._id;
  }

  get zip(): number {
    return this._zip;
  }

  get name(): string {
    return this._name;
  }

  private _id: number;
  private _zip: number;
  private _name: string;

  constructor(id: number, zip: number, name: string) {
    this._id = id;
    this._zip = zip;
    this._name = name;
  }
}
