
var mysql   = require('mysql')

var sqlConnection = function sqlConnection(sql, values, next) {

    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createConnection({
        host: 'remotemysql.com',
        user: 'twTR9Q3d2t',
        password: 'QDQFCdT0nl',
        database: 'twTR9Q3d2t',
        port: 3306
     });
    connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }
    });

    connection.query(sql, values, function(err) {

        connection.end(); 

        if (err) {
            throw err;
        }

        next.apply(this, arguments);

    });
}

module.exports = sqlConnection;
