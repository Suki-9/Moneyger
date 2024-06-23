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
      log: '++id, date, value, summary',
      tags: '++id, name, summary',
      bind: '++id, tagId, logId',
    });
  }

  async insert(v: LogRecord): Promise<LogRecord['id'] | undefined> {
    try {
      return await this.log.add(v);
    } catch (e) {
      console.error(e);
    }
  }

  async update(v: LogRecord): Promise<LogRecord['id'] | undefined> {
    try {
      if (v.id) {
        return await this.log.update(
          v.id,
          Object.fromEntries<LogRecord>(Object.entries(v).filter(([k, _]) => k != 'id'))
        );
      } else throw new Error('Invalid parameter. -> id');
    } catch (e) {
      console.error(e);
    }
  }

  async select(limit: number = 50, sort?: {
    key: keyof Pick<LogRecord, 'date' | 'value'>,
    type: 'upper' | 'lower'
  }) {
    const rec = await this.log.limit(limit).toArray();

    return sort
      ? rec.sort((a, b) => {
        if (sort.type == 'lower') return a[sort.key] > b[sort.key] ? 1 : -1;
        else return a[sort.key] < b[sort.key] ? 1 : -1;
      })
      : rec;
  }
}
