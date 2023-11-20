const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'appointment-db',
    password: 'Mudasir@1231'
})
mysqlConnection.connect((err) => {
    if (err) {
        console.log('error in db connection', JSON.stringify(err, undefined, 2));
    }
    else {
        console.log("db connected successfuly")
    }
})
module.exports = mysqlConnection;