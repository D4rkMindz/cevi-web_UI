export class Gender {
  private _id = null;
  private _name_de: string = null;
  private _name_en: string = null;
  private _name_fr: string = null;
  private _name_it: string = null;

  /**
   * Gender constructor
   * @param data
   */
  constructor(data) {
    if (data) {
      this.fill(data);
    }
  }

  /**
   * Fill in data
   * @param data
   */
  public fill(data) {

    if ('id' in data) {
      this.id = data.id;
    }

    if ('name_de' in data) {
      this.name_de = data.name_de;
    }

    if ('name_en' in data) {
      this.name_en = data.name_en;
    }

    if ('name_fr' in data) {
      this.name_fr = data.name_fr;
    }

    if ('name_it' in data) {
      this.name_it = data.name_it;
    }
  }

  get name_it(): string {
    return this._name_it;
  }

  set name_it(value: string) {
    this._name_it = value;
  }

  get name_fr(): string {
    return this._name_fr;
  }

  set name_fr(value: string) {
    this._name_fr = value;
  }

  get name_en(): string {
    return this._name_en;
  }

  set name_en(value: string) {
    this._name_en = value;
  }

  get name_de(): string {
    return this._name_de;
  }

  set name_de(value: string) {
    this._name_de = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}
