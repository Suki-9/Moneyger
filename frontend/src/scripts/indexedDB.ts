import Dexie, { Table } from "dexie";

export interface LogRecord {
  id?: number;
  date: number;
  value: number;
  summary?: string;
}

export class IndexedDB extends Dexie {
  log!: Table<LogRecord>;

  constructor() { 
    super('Moneyger');
    this.version(1).stores({
      log: '++id, date, value, summary'
    });
  }

  async insert(v: LogRecord) {
    console.log(this);
    try {
      await this.log.add(v);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async update(v: LogRecord) {
    try {
      if (v.id) {
        await this.log.update(
          v.id,
          Object.fromEntries<LogRecord>(Object.entries(v).filter(([k, _]) => k != 'id'))
        );
      } else throw new Error('Invalid parameter. -> id');
      return true;
    } catch (e) {
      console.error(e);
      return false;
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
