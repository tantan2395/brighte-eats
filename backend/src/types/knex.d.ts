import type { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    leads: Knex.CompositeTableType<Leads, Omit<Leads, 'id'>, Partial<Omit<Leads, 'id'>>>;
  }
}
