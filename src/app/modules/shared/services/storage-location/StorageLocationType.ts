export class StorageLocationType {
  private readonly _type: string;

  constructor(type: string) {
    if (!type.match(/^location|room|corridor|shelf|tray|chest$/)) {
      type = 'location';
    }

    this._type = type;
  }

  get type(): string {
    return this._type;
  }
}
