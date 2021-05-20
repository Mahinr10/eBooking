const { resolveInclude } = require('ejs');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'ebooking'
});

function make_interest(Person_id, Post_id){
    Query = `insert into interest (Person_id, Post_id) values (${Person_id}, ${Post_id})`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in inserting data in interest');
            }
            resolve('succesfully inserted in interest');
        })
    })
}

function loose_interest(Person_id, Post_id){
    Query = `delete from interest where Person_id = ${Person_id} AND Post_id = ${Post_id}`;
    console.log(Query);
    return new Promise((resolve, reject)=>{
        connection.query(Query, (err, rows, fields)=>{
            if(err){
                reject('error in deleting data from interest');
            }
            resolve('succesfully deleted data from interest');
        })
    })
}

module.exports.make_interest = make_interest;
module.exports.loose_interest = loose_interest;