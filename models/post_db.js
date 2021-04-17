const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user:'root',
    database:'ebooking'
});

function get_all_post(){
    Query = `SELECT users.Name, posts.text_body, posts.post_time, posts.start_time, posts.end_time, posts.end_time, posts.Amount from posts left JOIN users on posts.Person_id = users.Person_id`
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