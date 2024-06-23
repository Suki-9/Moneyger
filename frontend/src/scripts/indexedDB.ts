import Dexie, { Table } from "dexie";

export interface LogRecord {
  id?: number;
  date: number;
  value: number;
  summary?: string;
}

export interface TagRecord {
  id?: number;
  name: string;
  summary?: string;
}

export interface BindRecord {
  id?: number;
  tagId: NonNullable<TagRecord['id']>;
  logId: NonNullable<LogRecord['id']>;
}

export class IndexedDB extends Dexie {
  log!: Table<LogRecord>;
  tags!: Table<TagRecord>;
  bind!: Table<BindRecord>;

  constructor() {
    super('Moneyger');
    this.version(3).stores({
      log:  '++id, date, value, summary',
      tags: '++id, name, summary',
      bind: '++id, tagId, logId',
    });
  }

  async insert<T extends 'log' | 'tags' | 'bind', R extends (T extends 'log' ? LogRecord & { tags: NonNullable<TagRecord['id']>[] } : T extends 'tags' ? TagRecord : BindRecord)>(
    table: T,
    v: R | R[],
  ) {
    if (!Array.isArray(v)) v = [v];

    await this.transaction('readwrite', [this[table], this.bind], () => Promise.all(
      v.map(async _v => {
        const id = await this[table].add(
          Object.fromEntries<LogRecord>(Object.entries(_v).filter(([k, _]) => k != 'tags') as any) as any
        );

        if ('tags' in _v) await Promise.all(_v.tags.map(tagId => this.bind.add({ tagId, logId: id })))
      })
    ));
  }

  async update<T extends 'log' | 'tags' | 'bind', R extends (T extends 'log' ? LogRecord & { tags: NonNullable<TagRecord['id']>[] } : T extends 'tags' ? TagRecord : BindRecord)>(
    table: T,
    v: R | R[],
  ) {
    if (!Array.isArray(v)) v = [v];

    await this.transaction('readwrite', [this[table], this.bind], () => Promise.all(
      v.map(async _v => {
        await this[table].update(
          _v.id,
          Object.fromEntries<LogRecord>(Object.entries(_v).filter(([k, _]) => k != 'id' && k != 'tags'))
        );

        if ('tags' in _v && _v.id) {
          await this.bind.where('logId').equals(_v.id).delete()
          await Promise.all(_v.tags.map(tagId => _v.id && this.bind.add({ logId: _v.id, tagId })))
        }
      })
    ));
  }

  async drop<T extends 'log' | 'tags' | 'bind'>(table: T, id: number) {
    await this.transaction('readwrite', [this[table], this.bind], async () => {
      if (table == 'log') await this.bind.where('logId').equals(id).delete();
      await this[table].delete(id);
    });
  }

  sort<T extends 'log' | 'tags' | 'bind', R extends (T extends 'log' ? LogRecord : T extends 'tags' ? TagRecord : BindRecord)>(
    target: R[],
    key: keyof R,
    type: 'upper' | 'lower',
  ): R[] {
    return target.sort((a, b) => {
      if (type == 'lower') return a[key] > b[key] ? 1 : -1;
      else return a[key] < b[key] ? 1 : -1;
    })
  }
}
