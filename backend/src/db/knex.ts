import knex from 'knex';
import type { Knex } from 'knex';
import config from '../../knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = config as Record<string, Knex.Config>;

export default knex(knexConfig[environment]);
