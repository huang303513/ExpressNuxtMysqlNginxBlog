let mysql = require('mysql');
import getConfig from '../../config';
let config = getConfig(process.env.NODE_ENV);


let pool = mysql.createPool(config.dbConfig);
/**
 * sql, SqlParams  参数只可能是一个或者两个
 * @return {[type]} [description]
 */

export  function mysqlQuery(...args) {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject({ err: err, result: "failure" });
                } else {
                    connection.query(...args, function(err, result, fields) {
                        if (err) {
                            reject({ err, result });
                        } else {
                            resolve({ err, result });
                        }
                        connection.release();
                    });
                }

            });
        } catch (e) {
            reject({ err: e, result: "failure" });
        } finally {

        }
    });
}