const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user:'root',
    database:'ebooking'
});

function get_all_post(Person_id){
    Query = `SELECT users.Name, users.Person_id, posts.text_body, posts.post_time, posts.start_time, posts.end_time, posts.end_time, posts.Amount from posts left JOIN users on posts.Person_id = users.Person_id where users.Person_id != ${Person_id} order by posts.post_time desc`
    console.log(Query)
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in fetching posts');
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

function make_post(obj){
    Query = `INSERT INTO posts (Person_id, Amount, text_body, start_time, end_time) VALUES
    (${obj.Person_id}, ${obj.amount}, '${obj.text}', '${obj.start_time}', '${obj.end_time}')`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                console.log(err)
                reject('error in storing at in database');
            }
            resolve("okay");
        })
    })

}

module.exports.get_all_post = get_all_post;
module.exports.make_post = make_post;