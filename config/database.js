// Update with your config settings.
require('dotenv').config()

module.exports = {

    client: 'mysql',
    connection: {
        host: process.env.DB_HOSTNAME,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        typeCast: function (field, next) {
            // console.log("typeCast::", field.type)
            if (field.type == 'JSON') {
                return (JSON.parse(field.string()));
            } else if (field.type === 'TINY' && field.length === 1) {
                return (field.string() === '1'); // 1 = true, 0 = false
            }
            return next();
        }
    },
    pool: {
        min: process.env.DB_POOL_MIN,
        max: process.env.DB_POOL_MAX,
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};