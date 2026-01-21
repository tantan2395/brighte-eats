import type { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    // table_name: TRecord, TResult (optional)
    users: Knex.CompositeTableType<User, Omit<User, 'id'>, Partial<Omit<User, 'id'>>>;
    // ... other tables
  }
}
