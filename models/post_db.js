const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    password: 'abcd',
    user:'root',
    database:'ebooking'
});

function get_all_post(){
    Query = `select * from posts`
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in fetching posts');
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

module.exports.get_all_post = get_all_post;