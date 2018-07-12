/**
 * @file modules/db/index.js
 * @author GPlay97
 * @description Database module
 */
const mysql = require('mysql'),
    srv_config = require('./../../srv_config.json'),
    srv_errors = require('./../../srv_errors.json'),
    db = mysql.createPool({
        host: srv_config.DB_HOST,
        user: srv_config.DB_USER,
        password: srv_config.DB_PW,
        database: srv_config.DB_DB
    });

module.exports = {
    /**
     * Queries the database for given sql string and parameters
     * It automatically escapes the sql string through binding with given parameters
     * @example db.query('SELECT id FROM foo WHERE bar=?', ['foobar'], (err, queryRes) => console.log(err, queryRes));
     * @param {String} sql the sql string
     * @param {Array} params Array of values to bind to parameters ('?' within sql string)
     * @param {Function} callback callback function
     */
    query: (sql, params, callback) => {
        if (typeof callback !== 'function') return srv_errors.INVALID_PARAMETERS;
        if (typeof sql === 'string' && Array.isArray(params)) db.query(mysql.format(sql, params), (err, queryRes) => callback(err, queryRes));
        else callback(srv_errors.INVALID_PARAMETERS);
    }
};