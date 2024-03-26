import { Pool } from 'pg';

export interface DBAuth {
  id: number;
  login: string;
  password: string;
}

export interface MAX {
  max: number;
}

export class DBConnect {
  #db: Pool;

  constructor() {
    this.#db = new Pool({
      user: 'admin',
      password: 'mymusicispower',
      host: 'localhost',
      port: 5432,
      database: 'mybase'
    });
  }

  async addUser(login: string, password: string): Promise<void> {
    const res = await this.#db.query<MAX>('SELECT MAX(id) FROM auth');
    const id = res.rows[0].max + 1;
    await this.#db.query('INSERT INTO auth (id, login, password) VALUES ($1, $2, $3)', [id, login, password]);
  }
}
