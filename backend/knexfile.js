// Update with your config settings.
const connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'pg',
    connection: {
      connectionString,
      ssl: {
        rejectUnauthorized: false
      },
    },
    migrations: {
      tableName: "knex_migrations",
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString,
      ssl: {
        rejectUnauthorized: false
      },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
    },
  }

};
