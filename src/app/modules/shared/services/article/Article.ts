import { toDate } from '../../../../functions/to-date';
import { Moment } from 'moment';

export class Article {
  /**
   * General information
   */
  private _id: string;
  private _title: { name_de: string, name_en: string, name_fr: string, name_it: string };
  private _description: {
    name_de: { plain: string, parsed: string },
    name_en: { plain: string, parsed: string },
    name_fr: { plain: string, parsed: string },
    name_it: { plain: string, parsed: string },
  };
  private _quality: {
    id: string,
    level: number,
    name: { name_de: string, name_en: string, name_fr: string, name_it: string },
  };
  private _quantity: number;
  private _purchase_date: Moment;
  private _replacement: { needed: boolean, date: Moment };

  /**
   * Locations
   */
  private _storage: { id: string, name: string, url: string };
  private _room: { id: string, name: string, url: string };
  private _corridor: { id: string, name: string, url: string };
  private _shelf: { id: string, name: string, url: string };
  private _tray: { id: string, name: string, url: string };
  private _chest: { id: string, name: string, url: string };

  /**
   * Meta
   */
  private _created_at: Moment;
  private _created_by: string;
  private _modified_at: Moment;
  private _modified_by: string;
  private _archived_at: Moment;
  private _archived_by: string;

  public constructor(data?: any) {
    if (data) {
      this.fill(data);
    }
  }

  /**
   * Fill in data
   * @param data
   */
  public fill(data) {
    this.extractGeneralInfo(data);
    this.extractLocations(data);
    this.extractMeta(data);
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      quality: this.quality,
      quantity: this.quantity,
      purchase_date: this.purchase_date,
      replacement: this.replacement,
      storage: this.storage,
      room: this.room,
      corridor: this.corridor,
      shelf: this.shelf,
      tray: this.tray,
      chest: this.chest,
      created_at: this.created_at,
      created_by: this.created_by,
      modified_at: this.modified_at,
      modified_by: this.modified_by,
      archived_at: this.archived_at,
      archived_by: this.archived_by,
    };
  }

  /**
   * Extract general information
   * @param data
   */
  private extractGeneralInfo(data) {
    if ('id' in data) {
      this.id = data.id;
    }

    if ('title' in data) {
      const title = {name_de: null, name_en: null, name_fr: null, name_it: null};
      if ('name_de' in data.title) {
        title.name_de = data.title.name_de;
      }

      if ('name_en' in data.title) {
        title.name_en = data.title.name_en;
      }

      if ('name_fr' in data.title) {
        title.name_fr = data.title.name_fr;
      }

      if ('name_it' in data.title) {
        title.name_it = data.title.name_it;
      }
      this.title = title;
    }

    if ('description' in data) {
      const description = {
        name_de: {plain: null, parsed: null},
        name_en: {plain: null, parsed: null},
        name_fr: {plain: null, parsed: null},
        name_it: {plain: null, parsed: null},
      };
      if ('name_de' in data.description) {
        if ('plain' in data.description.name_de) {
          description.name_de.plain = data.description.name_de.plain;
        }
        if ('parsed' in data.description.name_de) {
          description.name_de.parsed = data.description.name_de.parsed;
        }
      }
      if ('name_en' in data.description) {
        if ('plain' in data.description.name_en) {
          description.name_en.plain = data.description.name_en.plain;
        }
        if ('parsed' in data.description.name_en) {
          description.name_en.parsed = data.description.name_en.parsed;
        }
      }
      if ('name_fr' in data.description) {
        if ('plain' in data.description.name_fr) {
          description.name_fr.plain = data.description.name_fr.plain;
        }
        if ('parsed' in data.description.name_fr) {
          description.name_fr.parsed = data.description.name_fr.parsed;
        }
      }
      if ('name_it' in data.description) {
        if ('plain' in data.description.name_it) {
          description.name_it.plain = data.description.name_it.plain;
        }
        if ('parsed' in data.description.name_it) {
          description.name_it.parsed = data.description.name_it.parsed;
        }
      }
      this.description = description;
    }

    if ('quality' in data) {
      const quality = {
        id: null,
        level: null,
        name: {name_de: null, name_en: null, name_fr: null, name_it: null},
      };
      if ('id' in data.quality) {
        quality.id = data.quality.id;
      }
      if ('level' in data.quality) {
        quality.level = data.quality.level;
      }
      if ('name' in data.quality) {
        if ('name_de' in data.quality.name) {
          quality.name.name_de = data.quality.name.name_de;
        }
        if ('name_en' in data.quality.name) {
          quality.name.name_en = data.quality.name.name_en;
        }
        if ('name_fr' in data.quality.name) {
          quality.name.name_fr = data.quality.name.name_fr;
        }
        if ('name_it' in data.quality.name) {
          quality.name.name_it = data.quality.name.name_it;
        }
      }
      this.quality = quality;
    }

    if ('quantity' in data) {
      this.quantity = data.quantity;
    }

    if ('purchase_date' in data) {
      this.purchase_date = toDate(data.purchase_date);
    }

    if ('replacement' in data) {
      const replacement = {needed: null, date: null};
      if ('needed' in data.replacement) {
        replacement.needed = data.replacement.needed;
      }

      if ('date' in data.replacement) {
        replacement.date = toDate(data.replacement.date);
      }
      this.replacement = replacement;
    }
  }

  /**
   * Extract locations
   * @param data
   */
  private extractLocations(data) {
    if ('storage' in data) {
      this.storage = this.extractLocation(data.storage);
    }
    if ('room' in data) {
      this.room = this.extractLocation(data.room);
    }
    if ('corridor' in data) {
      this.corridor = this.extractLocation(data.corridor);
    }
    if ('shelf' in data) {
      this.shelf = this.extractLocation(data.shelf);
    }
    if ('tray' in data) {
      this.tray = this.extractLocation(data.tray);
    }
    if ('chest' in data) {
      this.chest = this.extractLocation(data.chest);
    }
  }

  /**
   * Extract single location
   * @param data
   * @return {{id: null; name: null; url: null}}
   */
  private extractLocation(data) {
    const location = {id: null, name: null, url: null};
    if ('id' in data) {
      if (data.id === null || data.id === '0' || data.id === 0) {
        return location;
      }
      location.id = data.id;
    }

    if ('name' in data) {
      location.name = data.name;
    }

    if ('url' in data) {
      location.url = data.url;
    }

    return location;
  }

  /**
   * Extract meta data
   * @param data
   */
  private extractMeta(data) {
    if ('created_at' in data) {
      this.created_at = toDate(data.created_at);
    }
    if ('created_by' in data) {
      this.created_by = data.created_by;
    }
    if ('modified_at' in data) {
      this.modified_at = toDate(data.modified_at);
    }
    if ('modified_by' in data) {
      this.modified_by = data.modified_by;
    }
    if ('archived_at' in data) {
      this.archived_at = toDate(data.archived_at);
    }
    if ('archived_by' in data) {
      this.archived_by = data.archived_by;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): { name_de: string; name_en: string; name_fr: string; name_it: string } {
    return this._title;
  }

  set title(value: { name_de: string; name_en: string; name_fr: string; name_it: string }) {
    this._title = value;
  }

  get description(): { name_de: { plain: string; parsed: string }; name_en: { plain: string; parsed: string }; name_fr: { plain: string; parsed: string }; name_it: { plain: string; parsed: string } } {
    return this._description;
  }

  set description(value: { name_de: { plain: string; parsed: string }; name_en: { plain: string; parsed: string }; name_fr: { plain: string; parsed: string }; name_it: { plain: string; parsed: string } }) {
    this._description = value;
  }

  get quality(): { id: string, level: number; name: { name_de: string; name_en: string; name_fr: string; name_it: string } } {
    return this._quality;
  }

  set quality(value: { id: string, level: number; name: { name_de: string; name_en: string; name_fr: string; name_it: string } }) {
    this._quality = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get purchase_date(): Moment {
    return this._purchase_date;
  }

  set purchase_date(value: Moment) {
    this._purchase_date = value;
  }

  get replacement(): { needed: boolean; date: Moment } {
    return this._replacement;
  }

  set replacement(value: { needed: boolean; date: Moment }) {
    this._replacement = value;
  }

  get storage(): { id: string; name: string; url: string } {
    return this._storage;
  }

  set storage(value: { id: string; name: string; url: string }) {
    this._storage = value;
  }

  get room(): { id: string; name: string; url: string } {
    return this._room;
  }

  set room(value: { id: string; name: string; url: string }) {
    this._room = value;
  }

  get corridor(): { id: string; name: string; url: string } {
    return this._corridor;
  }

  set corridor(value: { id: string; name: string; url: string }) {
    this._corridor = value;
  }

  get shelf(): { id: string; name: string; url: string } {
    return this._shelf;
  }

  set shelf(value: { id: string; name: string; url: string }) {
    this._shelf = value;
  }

  get tray(): { id: string; name: string; url: string } {
    return this._tray;
  }

  set tray(value: { id: string; name: string; url: string }) {
    this._tray = value;
  }

  get chest(): { id: string; name: string; url: string } {
    return this._chest;
  }

  set chest(value: { id: string; name: string; url: string }) {
    this._chest = value;
  }

  get created_at(): Moment {
    return this._created_at;
  }

  set created_at(value: Moment) {
    this._created_at = value;
  }

  get created_by(): string {
    return this._created_by;
  }

  set created_by(value: string) {
    this._created_by = value;
  }

  get modified_at(): Moment {
    return this._modified_at;
  }

  set modified_at(value: Moment) {
    this._modified_at = value;
  }

  get modified_by(): string {
    return this._modified_by;
  }

  set modified_by(value: string) {
    this._modified_by = value;
  }

  get archived_at(): Moment {
    return this._archived_at;
  }

  set archived_at(value: Moment) {
    this._archived_at = value;
  }

  get archived_by(): string {
    return this._archived_by;
  }

  set archived_by(value: string) {
    this._archived_by = value;
  }
}
