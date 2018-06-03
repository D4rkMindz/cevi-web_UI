export class QualityLevel {
  private _id: string;
  private _level: number;
  private _name_de: string;
  private _name_en: string;
  private _name_fr: string;
  private _name_it: string;

  /**
   * QualityLevel constructor
   * @param data
   */
  constructor(data) {
    if (data) {
      this.fill(data);
    }
  }

  /**
   * fill in data.
   * @param data
   */
  public fill(data) {
    if ('id' in data) {
      this.id = (<string>data.id);
    }

    if ('level' in data) {
      this.level = data.level;
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

  /**
   * Return quality level as object
   * @returns {any}
   */
  public toObject() {
    return {
      id: this.id,
      level: this.level,
      name_de: this.name_de,
      name_en: this.name_en,
      name_fr: this.name_fr,
      name_it: this.name_it,
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get name_de(): string {
    return this._name_de;
  }

  set name_de(value: string) {
    this._name_de = value;
  }

  get name_en(): string {
    return this._name_en;
  }

  set name_en(value: string) {
    this._name_en = value;
  }

  get name_fr(): string {
    return this._name_fr;
  }

  set name_fr(value: string) {
    this._name_fr = value;
  }

  get name_it(): string {
    return this._name_it;
  }

  set name_it(value: string) {
    this._name_it = value;
  }
}
