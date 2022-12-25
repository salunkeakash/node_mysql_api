const { createUser, getUserById, getUser, deleteUser, UpdateUser, getUserByEmail } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require('jsonwebtoken');
module.exports = {
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                return err
            }
            console.log(results);
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            console.log(result);
            if (result) {
                results.password = undefined;
                const jsonwebtoken = sign({ result: results }, 'test123', {
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: 'login  sucessfuly',
                    token: jsonwebtoken
                })
            } else {
                return res.json({
                    success: 0,
                    message: 'invalid email or password',
                    token: jsonwebtoken
                })
            }
        })
    },
    userCreate: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0, message: err
                })
            }
            return res.status(200).json({ sucess: 1, data: results });
        })
    },
    userById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0, message: err
                })
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    message: 'Record Not Found'
                })
            }
            return res.status(200).json({ sucess: 1, data: results });
        });
    },
    getusers: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                sucess: 1,
                data: results
            });
        });
    },
    userUpdate: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        UpdateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0, message: err
                })
            }
            return res.status(200).json({ sucess: 1, data: results });
        })
    },

    userDelete: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    }
}