const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user:'root',
    database:'ebooking'
});

function get_all_post(Person_id){
    Query = `SELECT tt1.Post_id, tt1.Person_id, tt1.Amount, tt1.text_body, tt1.start_time, tt1.end_time, tt1.post_time, tt1.IsActive, users.Name, users.Phone, users.Email from (SELECT t1.Post_id, t1.Person_id, t1.Amount, t1.text_body, t1.start_time, t1.end_time, t1.post_time, t2.Person_id as IsActive from (SELECT * from posts WHERE Person_id != ${Person_id}) t1 LEFT JOIN (SELECT * from interest WHERE Person_id = ${Person_id}) t2 on t1.Post_id = t2.Post_id order by t1.post_time desc ) tt1 left join users on users.Person_id = tt1.Person_id order by tt1.post_time desc`
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
    let Query = `INSERT INTO posts (Person_id, Amount, text_body, start_time, end_time) VALUES (${obj.Person_id}, ${obj.amount}, '${obj.text}', '${obj.start_time}', '${obj.end_time}')`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                console.log(err)
                reject('error in storing at in database');
            }
            Query = `select Post_id from posts ORDER by Post_id DESC LIMIT 1`;
            connection.query(Query, (err, rows, fields)=>{
                if(err){
                    reject('error in finding last post id');
                }
                resolve(JSON.parse(JSON.stringify(rows[0])));
            })
        })
    })

}



module.exports.get_all_post = get_all_post;
module.exports.make_post = make_post;