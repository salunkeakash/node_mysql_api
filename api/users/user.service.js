var pool = require('../../config/database');
module.exports = {
    createUser: (data, callback) => {
        pool.query(`insert into users(first_name,last_name,email,password,mobile)value(?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.mobile,
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },

    getUser: callback => {
        pool.query(`select id, first_name,last_name,email,mobile from users`, [], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
    },
    getUserById: (id, callback) => {
        pool.query(`select id, first_name,last_name,email,mobile from users where id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },
    UpdateUser: (data, callback) => {
        pool.query(`update users set first_name=? ,last_name=?,mobile=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.mobile,
                data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            });
    },

    deleteUser: (data, callback) => {
        pool.query(`delete from users where id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

}