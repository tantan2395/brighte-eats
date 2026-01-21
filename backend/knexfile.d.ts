import { Knex } from 'knex';

declare const _default: {
  development: Knex.Config;
  test: Knex.Config;
  [key: string]: Knex.Config;
};

export default _default;
