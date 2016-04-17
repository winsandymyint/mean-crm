var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});
con.connect(function(err) {
    if(err) {
        throw new Error("Can't connect to MySQL.");
    } else {
        con.query("USE " + 'test', function(err, rows, fields) {
            if(err) {
                throw new Error("Missing database.");
            } else {
                console.log("Successfully selected database.");
                return {
                    add: function(data, callback) {
                        var date = new Date();
                        var query = "";
                        query += "INSERT INTO articles (title, text, date) VALUES (";
                        query += connection.escape(data.title) + ", ";
                        query += connection.escape(data.text) + ", ";
                        query += "'" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "'";
                        query += ")";
                        connection.query(query, callback);
                    },
                    update: function(data, callback) {
                        var query = "UPDATE articles SET ";
                        query += "title=" + connection.escape(data.title) + ", ";
                        query += "text=" + connection.escape(data.text) + " ";
                        query += "WHERE id='" + data.id + "'";
                        connection.query(query, callback);
                    },
                    get: function(callback) {
                        var query = "SELECT * FROM articles ORDER BY id DESC";
                        connection.query(query, function(err, rows, fields) {
                            if(err) {
                                throw new Error("Error getting.");
                            } else {
                                callback(rows);
                            }
                        });
                    },
                    remove: function(id, callback) {
                        var query = "DELETE FROM articles WHERE id='" + id + "'";
                        connection.query(query, callback);
                    }
                }
            }
        })
    }
});