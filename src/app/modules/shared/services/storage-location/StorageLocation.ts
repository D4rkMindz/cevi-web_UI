import { Moment } from 'moment';
import { StorageLocationType } from './StorageLocationType';
import { toDate } from '../../../../functions/to-date';

export class StorageLocation {

  private _id: string;
  private _name: string;
  private _type: StorageLocationType;
  private _createdAt: Moment;
  private _createdBy: string;
  private _modifiedAt: Moment;
  private _modifiedBy: string;
  private _archivedAt: Moment;
  private _archivedBy: string;

  /**
   * fill in storage location
   * @param data
   * @param {string} type
   */
  fill(data, type: string) {
    if ('id' in data) {
      this.id = data.id;
    }

    if ('name' in data) {
      this.name = data.name;
    }

    if ('created_at' in data) {
      this.createdAt = toDate(data.created_at);
    }

    if ('created_by' in data) {
      this.createdBy = data.created_by;
    }

    if ('modified_at' in data) {
      this.modifiedAt = toDate(data.modified_at);
    }

    if ('modified_by' in data) {
      this.modifiedBy = data.modified_by;
    }

    if ('archived_at' in data) {
      this.archivedAt = toDate(data.archived_at);
    }

    if ('archived_by' in data) {
      this.archivedBy = data.archived_by;
    }

    this.type = new StorageLocationType(type);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): StorageLocationType {
    return this._type;
  }

  set type(value: StorageLocationType) {
    this._type = value;
  }

  get createdAt(): Moment {
    return this._createdAt;
  }

  set createdAt(value: Moment) {
    this._createdAt = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get modifiedAt(): Moment {
    return this._modifiedAt;
  }

  set modifiedAt(value: Moment) {
    this._modifiedAt = value;
  }

  get modifiedBy(): string {
    return this._modifiedBy;
  }

  set modifiedBy(value: string) {
    this._modifiedBy = value;
  }

  get archivedAt(): Moment {
    return this._archivedAt;
  }

  set archivedAt(value: Moment) {
    this._archivedAt = value;
  }

  get archivedBy(): string {
    return this._archivedBy;
  }

  set archivedBy(value: string) {
    this._archivedBy = value;
  }
}
